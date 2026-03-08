from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_mistralai import MistralAIEmbeddings
from langchain_chroma import Chroma
from app.config import setting
from langchain_classic.chains import RetrievalQA  # Исправлено: langchain_classic -> langchain
from langchain_mistralai import ChatMistralAI
from langchain_classic.chains import create_retrieval_chain  # Исправлено: langchain_classic -> langchain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain  # Исправлено: langchain_classic -> langchain
from langchain_core.prompts import ChatPromptTemplate
import asyncio

# Глобальные переменные для переиспользования (инициализация один раз)
_vectorstore = None
_mistral = None
_embeddings = None

def initialize():
    """Инициализация компонентов (выполняется один раз)"""
    global _vectorstore, _mistral, _embeddings
    
    if _vectorstore is not None:
        return
    
    key = setting.MISTRAL_API_KEY
    
    _mistral = ChatMistralAI(
        mistral_api_key=key
    )
    
    _embeddings = MistralAIEmbeddings(
        model="mistral-embed",
        api_key=key,
    )
    
    # Загрузка и подготовка документа
    loader = PyPDFLoader("https://eriskip.com/uploads/files/ru/4/322/katalog-produkcii-eris-2025.pdf")
    docs = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    _vectorstore = Chroma.from_documents(documents=splits, embedding=_embeddings)

async def answer_pdf(question):
    """Асинхронная функция для ответа на вопрос по PDF"""
    # Убеждаемся, что инициализация выполнена
    initialize()  # убрал await, так как функция синхронная
    
    retriever = _vectorstore.as_retriever(
        search_kwargs={"k": 4}  # Количество релевантных чанков
    )

    system_prompt = (
        "Ты должен ответить на вопрос пользователя с использованием данных из каталога продукции.\n"
        "Отвечай подробно и по делу.\n\n"
        "Важные указания:\n"
        "1. Если пользователь запрашивает инструкцию по эксплуатации (как в вопросе про АНКАТ-2), "
        "сообщи, что в текущем каталоге инструкции отсутствуют, но есть описание прибора.\n"
        "2. Если спрашивают про сервисные центры, посмотри в каталоге информацию о сервисном обслуживании.\n"
        "3. Названия приборов могут содержать опечатки - используй нечеткий поиск для определения правильного прибора.\n"
        "4. Если в вопросе упоминается email (для отправки документов), обязательно учти это в ответе.\n\n"
        "Контекст из каталога:\n{context}"
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{input}"),
        ]
    )
    
    question_answer_chain = create_stuff_documents_chain(_mistral, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    
    result = await rag_chain.ainvoke({"input": question})
    return result['answer']

async def analyze(data):
    """
    Функция для вызова через neural_service.analyze()
    Теперь асинхронная!
    
    Args:
        data (dict): Словарь с полями:
            - text: текст сообщения (вопрос)
            - subject: тема письма
            - from: email отправителя
    
    Returns:
        dict: Ответ нейронки
    """
    # Извлекаем вопрос из текста сообщения
    question = data.get('text', '')
    subject = data.get('subject', '')
    from_email = data.get('from', '')
    
    # Добавляем информацию о теме и отправителе в контекст
    enhanced_question = question
    if subject:
        enhanced_question = f"[Тема: {subject}] {question}"
    if from_email:
        enhanced_question = f"{enhanced_question}\n[Отправитель: {from_email}]"
    
    # Получаем ответ (теперь с await)
    answer = await answer_pdf(enhanced_question)
    
    # Формируем ответ в нужном формате
    return {
        'answer': answer,
        'original_question': question,
        'subject': subject,
        'from': from_email
    }