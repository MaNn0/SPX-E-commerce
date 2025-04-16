from sqlalchemy import Column, Integer,Boolean, String, Float
from app.db.database import Base

class Product(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    new = Column(Boolean, nullable=True)
    gender = Column(String, nullable=False)
    hot = Column(Boolean, nullable=True)
    image_url = Column(String, nullable=False)