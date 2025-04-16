1. To create venv called env: python3 -m venv env
2. To activate venv: source env/bin/activate
3. install fast api: pip install fastapi
   to download fastapi with all optional dependencies pip install fastapi[all] sqlalchemy psycopg2
4. install uvicorn (to run the server): pip install uvicorn[standard]
5. install sqlalchemy (database): pip install sqlalchemy psycopg2-binary
6. download postgres if not downloaded: sudo apt install postgresql postgresql-contrib
7. download cloudinary: pip install cloudinary python-multipart

==================================================

1. Create the database from pgadmin and insure the like in database.py
2. Create models for products, users ... etc
