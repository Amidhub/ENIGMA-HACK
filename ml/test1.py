from test import TextLoader
from test import RecursiveCharacterTextSplitter
from chromadb.config import Settings
from langchain_mistralai import MistralAIEmbeddings
from langchain_chroma import Chroma
from config import setting
from langchain_classic.chains import RetrievalQA
from langchain_mistralai import ChatMistralAI
def answer(question):
    loader = TextLoader("./master_i_margarita.txt",  encoding='utf-8')
    documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )
    documents = text_splitter.split_documents(documents)

    key = setting.MISTRAL_API_KEY;
    embeddings = MistralAIEmbeddings(
        model="mistral-embed",
        api_key= key,
    )

    db = Chroma.from_documents(
        documents,
        embeddings,
        client_settings=Settings(anonymized_telemetry=False),
    )

    question = "Какой плащ был у Понтия Пилата?"
    docs = db.similarity_search(question, k=4)

    mistral = ChatMistralAI(
        mistral_api_key=key
    )
    qa_chain = RetrievalQA.from_chain_type(mistral, retriever=db.as_retriever())
    return qa_chain({"query": "куда ездил Дима?"})['result']