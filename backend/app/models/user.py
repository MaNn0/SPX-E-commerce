from sqlalchemy import Integer, Column, String, DateTime
from sqlalchemy.orm import relationship
from app.models.cart_items import CartItems
# from sqlalchemy.sql import func
from app.db.database import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    cart_items = relationship('CartItems', back_populates='user', cascade='all, delete-orphan')
    # created_at = Column(DateTime(timezone=True), server_default=func.now())
    # updated_at = Column(DateTime(timezone=True), onupdate=func.now())