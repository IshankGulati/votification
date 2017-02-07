from django.conf.urls import url
from authentication.views import LoginView, LogoutView, UniqueDirectiveView


urlpatterns = [
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
    url(r'^check-unique-val/$', UniqueDirectiveView.as_view(),
        name="uniquedirective"),
]
