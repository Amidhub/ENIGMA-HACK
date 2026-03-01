import os
from config import setting
from langchain_mistralai import ChatMistralAI

from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import Runnable

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import (
    RecursiveCharacterTextSplitter,
)

key = setting.MISTRAL_API_KEY
question = "Ответь кратко. Какой плащ был у Понтия Пилата?"

# client = Mistral(api_key= key)
# inputs = [
#     {"role": "user", "content": question}
# ]

# response = client.beta.conversations.start(
#     agent_id="ag_019ca378416576599a91956f1b1825d7",
#     inputs=inputs,
# )

# if hasattr(response, 'outputs'):
#     # Для структуры с outputs
#     answer = response.outputs[0].content if response.outputs and len(response.outputs) > 0 else "Нет ответа"
# elif hasattr(response, 'content'):
#     # Прямой доступ к content
#     answer = response.content
# else:
#     # Если структура неизвестна, выводим весь response
#     answer = str(response)

# print(answer[0:200])

# Единый интерфейс для разных моделей
# mistral = ChatMistralAI(mistral_api_key=key)

# # Одинаковый вызов
# mistral.invoke([HumanMessage(content=question)])

# mistral = ChatMistralAI(mistral_api_key=key)
# response = mistral.invoke([HumanMessage(content=question)])
