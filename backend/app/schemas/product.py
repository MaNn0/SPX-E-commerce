from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name : str
    description : Optional[str] = None
    price : float
    category: str
    new : bool
    hot : bool
    brand : str
    gender : str
    image_url: str
    
class ProductUpdate(ProductBase):
    name: Optional[str] = None
    description: Optional[str] = None
    new : Optional[bool] = None
    hot : Optional[bool] = None
    brand : Optional[str] = None
    gender: Optional[str] = None
    price: Optional[float] = None
    
class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int

    class Config:
        from_attributes = True