from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.db.database import get_db
from typing import List
from app.models.product import Product
from app.schemas.product import ProductOut, ProductUpdate
import cloudinary.uploader
import app.cloudinary_config
import os


router = APIRouter(prefix='/products', tags=['products'])

@router.post('', response_model=ProductOut)
def create_product(
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    category: str =Form(...),
    new: bool = Form(...),
    gender:str=Form(...),
    hot: bool = Form(...),
    brand: str= Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 1. Upload image to Cloudinary
    try:
        result = cloudinary.uploader.upload(image.file, folder="products")
        image_url = result.get("secure_url")
    except Exception as e:
        print("Cloudinary error:", e)
        raise HTTPException(status_code=500, detail="Failed to upload image")

    # 2. Create product with image_url
    new_product = Product(
        name=name,
        description=description,
        price=price,
        new=new,
        hot=hot,
        gender=gender,
        brand=brand,
        category=category,
        image_url=image_url
    )

    # 3. Save to DB
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.get('', response_model=List[ProductOut])
def get_products( db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

@router.get('/{product_id}', response_model=ProductOut)
def get_product(product_id:int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(
            status_code = 404,
            detail=f'Error Product with ID {product_id} not found'
        )
    return product

@router.put('/{product_id}',response_model=ProductOut)
def update_product(product_id:int, product_data: ProductUpdate,db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code = 404,
            detail=f'Error Product with ID {product_id} not found'
        )
    update_product = product_data.dict(exclude_unset=True)
    for field, value in update_product.items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product

@router.delete('/{product_id}',response_model=dict)
def delete_product(product_id=int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code = 404,
            detail=f'Error Product with ID {product_id} not found'
        )
    db.delete(product)
    db.commit()
    return {"message": 'Product deleted successfully'}
