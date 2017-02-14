from rest_framework import permissions


class IsAuthorOfPoll(permissions.BasePermission):
    def has_object_permission(self, request, view, poll):
        if request.user:
            return poll.author == request.user
        return False