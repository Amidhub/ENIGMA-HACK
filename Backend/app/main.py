from contextlib import asynccontextmanager
import time
from typing import AsyncIterator

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis
# from sqladmin import Admin
from app.tickets.router import router as router_tickets
from app.email.router import router as router_email
from fastapi.middleware.cors import CORSMiddleware

import sys
from pathlib import Path

# Добавляем корень проекта в пути импорта
sys.path.append(str(Path(__file__).parent.parent))

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    # Startup
    redis = aioredis.from_url("redis://localhost")
    FastAPICache.init(RedisBackend(redis), prefix="cache")
    print("Redis cache initialized")
    yield
    # Shutdown
    await redis.close()
    print("Redis connection closed")
    
    
app = FastAPI(lifespan=lifespan)


app.include_router(router_tickets)
app.include_router(router_email)


#CORS
origins = [
    "http//:localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "Set-Cookie",  
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
    ],
)
