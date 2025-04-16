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
import uvicorn

app = FastAPI()
setup_cors(app)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # fallback to 8000 if PORT not set
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)

product.Base.metadata.create_all(bind=engine)

app.include_router(product_routers.router)
app.include_router(user_routers.router)
app.include_router(user_login.router)
app.include_router(cart_item.router)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

        
@app.get("/")
def read_root():
    return {"message": "SPX E-Commerce API is up and running!"}