backend:
	cd jotter-backend ;\
	source venv/bin/activate ; \
	uvicorn app.main:app

migrate:
	cd jotter-backend ;\
	alembic upgrade head ;

revision:
	cd jotter-backend ;\
	alembic revision --autogenerate;

test:
	cd jotter-backend ;\
	source venv/bin/activate ; \
	cd app ;\
	pytest --disable-warnings ;