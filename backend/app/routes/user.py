from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from typing import List
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, UserOut
from app.auth.authentication import get_current_user


router = APIRouter(prefix='/users', tags=['users'])

@router.post('',response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        firstName=user.firstName,
        lastName=user.lastName,
        email=user.email,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get('', response_model=UserOut)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get the profile of the currently logged-in user"""
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
    return current_user

@router.put('', response_model=UserOut)
def update_user(
    updated_user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update the current user's profile"""
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if updated_user.firstName is not None:
        user.firstName = updated_user.firstName
    if updated_user.lastName is not None:
        user.lastName = updated_user.lastName
    if updated_user.email is not None:
        user.email = updated_user.email

    db.commit()
    db.refresh(user)
    return user