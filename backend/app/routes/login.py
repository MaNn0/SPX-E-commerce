from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.models.user import User
from app.db.database import get_db
from app.auth.authentication import create_access_token

router = APIRouter()

class LoginInput(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.password != data.password:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "first_name": user.firstName}
