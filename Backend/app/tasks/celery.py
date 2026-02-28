from celery import Celery

celery = Celery(
    "tasks",
    broker="redis://localhost:6379",
    include=["app.tasks.tasks"]
)

# Настройка периодических задач
celery.conf.beat_schedule = {
    'check-new-emails-every-30s': {
        'task': 'process_new_emails',
        'schedule': 30.0,
    },
}

celery.autodiscover_tasks(['app.tasks'])