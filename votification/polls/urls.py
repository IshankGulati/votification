from rest_framework_nested import routers

from votes.views import PollViewSet


votes_router = routers.SimpleRouter()
votes_router.register(r'polls', PollViewSet)
