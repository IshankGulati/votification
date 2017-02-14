from django.conf.urls import url

from rest_framework_nested import routers

from authentication.views import AccountViewSet
from authentication.views import LoginView, LogoutView, UniqueDirectiveView
from polls.views import AccountPollViewSet


account_router = routers.SimpleRouter()
account_router.register(r'accounts', AccountViewSet)

user_votes_router = routers.NestedSimpleRouter(
    account_router, r'accounts', lookup='account'
)

user_votes_router.register(r'polls', AccountPollViewSet)

urlpatterns = [
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
    url(r'^check-unique-val/$', UniqueDirectiveView.as_view(),
        name="uniquedirective"),
]
