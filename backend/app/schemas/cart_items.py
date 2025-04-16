from pydantic import BaseModel
from typing import Optional
from app.schemas.product import ProductOut
from app.schemas.user import UserOut
from app.models.cart_items import CartItems

class CartItemBase(BaseModel):
    product_id: int
    quantity: int
    user_id: Optional[int] = None
    product: Optional[ProductOut] = None
    user: Optional[UserOut] = None
    
class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(CartItemBase):
    quantity: Optional[int] = None
    
class CartItemOut(CartItemBase):
    id: int

    class Config:
        from_attributes = True