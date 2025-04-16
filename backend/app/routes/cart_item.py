from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from typing import List
from app.models.cart_items import CartItems
from app.schemas.cart_items import CartItemCreate , CartItemOut, CartItemUpdate
from app.models.user import User
from app.models.product import Product
from app.auth.authentication import get_current_user 

router = APIRouter(prefix='/cart_items', tags=['cart_items'])

@router.post('/cart', response_model=CartItemOut)
def add_to_cart(cart_item:CartItemCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    user_id = current_user.id
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found")

    new_cart_item = CartItems(
        quantity=cart_item.quantity,
        user_id=current_user.id,
        product_id=product.id
    )

    db.add(new_cart_item)
    db.commit()
    db.refresh(new_cart_item)
    
    return new_cart_item

@router.get('/cart', response_model=List[CartItemOut])
def get_cart_items(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart_items = db.query(CartItems).filter(CartItems.user_id == current_user.id).all()
    return cart_items

@router.put('/cart/{cart_item_id}', response_model=CartItemOut)
def update_cart_item(cart_item_id: int, cart_item: CartItemUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_cart_item = db.query(CartItems).filter(CartItems.id == cart_item_id, CartItems.user_id == current_user.id).first()
    
    if not db_cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    if cart_item.quantity is not None:
        db_cart_item.quantity = cart_item.quantity

    db.commit()
    db.refresh(db_cart_item)
    
    return db_cart_item

@router.delete('/cart/{cart_item_id}', response_model=dict)
def delete_cart_item(cart_item_id: int, db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_cart_item = db.query(CartItems).filter(CartItems.id == cart_item_id, CartItems.user_id == current_user.id).first()
    if not db_cart_item:
        raise HTTPException(status_code=404, detail='Cart item not found')
    db.delete(db_cart_item)
    db.commit()
    return {"message": 'Product deleted successfully'}
