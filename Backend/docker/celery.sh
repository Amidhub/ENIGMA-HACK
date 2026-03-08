#!/bin/bash

celery -A app.tasks.celery worker --loglevel=info --pool=solo

celery -A app.tasks.celery beat --loglevel=info