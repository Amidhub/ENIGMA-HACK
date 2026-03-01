from chromadb.config import Settings
from config import setting
from langchain_mistralai import ChatMistralAI
from langchain_classic.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

def emotion(question):
    key = setting.MISTRAL_API_KEY;

    mistral = ChatMistralAI(
            mistral_api_key=key
    )
    levels = []
    system_prompt = (
        "Определи эмоциональную тональность сообщения\n"
        "Отнеси её к одному из уровней: 'положительный', 'нейтральный', 'негативный'.\n"
        "Ответь одним словом."
        "\n\n"
        "{context}"
    )
    mistral.invoke([HumanMessage(content=question)])
    mistral = ChatMistralAI(mistral_api_key=key)
    response = mistral.invoke([HumanMessage(content=question), SystemMessage(content = system_prompt)])
    return response.content
print(emotion("Какие же вы ужасные!!!"))