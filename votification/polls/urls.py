from django.conf.urls import url, include

from rest_framework_nested import routers

from votes.views import PollViewSet, VoteView


votes_router = routers.SimpleRouter()
votes_router.register(r'polls', PollViewSet)


urls = [
    url(r'^$', VoteView.as_view(), name='vote')
]