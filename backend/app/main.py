from fastapi import FastAPI
from .db.database import engine
from app.core.cors import setup_cors
from app.models import product
from app.routes import product as product_routers
from app.routes import user as user_routers
from app.routes import login as user_login
import logging
from app.routes import cart_item
import os

app = FastAPI()
setup_cors(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000)

product.Base.metadata.create_all(bind=engine)

app.include_router(product_routers.router)
app.include_router(user_routers.router)
app.include_router(user_login.router)
app.include_router(cart_item.router)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    try:
        product.Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Failed to create tables: {e}")
        