from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from chromadb.config import Settings
from langchain_mistralai import MistralAIEmbeddings
from langchain_chroma import Chroma
from config import setting
from langchain_classic.chains import RetrievalQA
from langchain_mistralai import ChatMistralAI
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
def answer_pdf(question):
    loader = PyPDFLoader("https://eriskip.com/uploads/files/ru/4/322/katalog-produkcii-eris-2025.pdf")
    docs = loader.load()
    key = setting.MISTRAL_API_KEY;

    mistral = ChatMistralAI(
            mistral_api_key=key
    )

    embeddings = MistralAIEmbeddings(
            model="mistral-embed",
            api_key= key,
    )
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)

    retriever = vectorstore.as_retriever()

    system_prompt = (
        "Ты должен ответить на вопрос пользователя с использованием данных из книги.\n"
        "Отвечай подробно.\n"
        "Названия приборов могут содержать опечатки или ошибки. Просьба найти в каталоге наиболее совпадающий прибор по расстоянию Левенштейна и вывести его.\n"
        "Вот части книги контекст для ответа:"
        "\n\n"
        "{context}"
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", f"{question}"),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(mistral, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    rag = rag_chain.invoke({"input": question})['answer']
    return rag
print(answer_pdf("Добрый день. Не можем найти инструкцию по эксплуатации на анализатор АНКАТ-2. Вышлите, пожалуйста, на email. Также интересует наличие сервисного центра в Новосибирске."))