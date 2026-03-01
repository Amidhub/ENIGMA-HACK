from fastapi import APIRouter, HTTPException, Request, Response, status
from app.operator.Schemas import authS
from app.operator.auth import get_password_hash
from app.operator.dao import OperReq
from app.operator.auth import login_user, create_access_token
from fastapi.responses import RedirectResponse


router = APIRouter(
    prefix="/auth",
    tags=["Регистрация/авторизация"]
)


@router.post('/login')
async def login_users(response: Response, user_data: authS):
    user = await login_user(user_data.login, user_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    jwt_token = create_access_token({'sub': str(user.id)})
    # response = RedirectResponse(url="/tasks", status_code=303)
    response.set_cookie('user_access_token', jwt_token, httponly=True)
    
    return user.id #user.id



@router.post('/logout')
async def login_users(response : Response) -> None:
    response.delete_cookie('user_access_token')


@router.get('/user/{id}')
async def login_users(id : int) -> None:
    row =  await OperReq.get_name(id = id)
    return row.login

