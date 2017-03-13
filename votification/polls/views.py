from rest_framework import views, viewsets, permissions
from rest_framework.response import Response
from django.db.models import Prefetch

from polls.models import Poll, Option
from polls.serializers import PollSerializer, OptionSerializer
from polls.permissions import IsAuthorOfPoll


class PollViewSet(viewsets.ModelViewSet):
    """Fetch all the polls
    """
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfPoll(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)

        return super(PollViewSet, self).perform_create(serializer)


class AccountPollViewSet(viewsets.ViewSet):
    """Fetch polls created by a particular user
    """
    # options will be fetched in another query to prevent joins
    queryset = Poll.objects.select_related('author').prefetch_related('options').all()
    serializer_class = PollSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class VoteView(views.APIView):
    """Cast Vote in a poll
    """
    permission_classes = (permissions.IsAuthenticated,)
    def put(self, request, format=None):
        data = request.data
        q_id = data.get('q_id')
        op_id = data.get('op_id')
        queryset = Poll.objects.get(id=q_id).prefetch_related(Prefetch('options',
                                                                       queryset=Option.objects.get(id=op_id),
                                                                       to_attr='selected_option'))
        current_votes = queryset.selected_option.count
        queryset.selected_option.update(count=current_votes+1)
