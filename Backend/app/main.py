from fastapi import FastAPI, Request, Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from app.tickets.router import router

import sys
from pathlib import Path

# Добавляем корень проекта в пути импорта
sys.path.append(str(Path(__file__).parent.parent))


app = FastAPI()


app.include_router(router)
