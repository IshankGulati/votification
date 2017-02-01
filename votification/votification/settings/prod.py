from votification.settings.base import *


CURRENT_ENV = 'prod'

ALLOWED_HOSTS = ['votification.herokuapp.com']

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}
