from fastapi import FastAPI
from app.db.database import engine #refers to the database engine used to interact with the database
from app.core.cors import setup_cors
from app.models import product
from app.routes import product as product_routers
from app.routes import user as user_routers
from app.routes import login as user_login
from app.routes import cart_item

app = FastAPI()
setup_cors(app)

product.Base.metadata.create_all(bind=engine)

app.include_router(product_routers.router)
app.include_router(user_routers.router)
app.include_router(user_login.router)
app.include_router(cart_item.router)