from sqlalchemy import Column, Integer,ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class CartItems(Base):
    __tablename__ = 'cart_items'
    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer, default=1)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    user = relationship('User', back_populates='cart_items')
    product = relationship('Product')