from rest_framework import serializers

from authentication.serializers import AccountSerializer
from polls.models import Poll, Option


class PollSerializer(serializers.ModelSerializer):
    """ Serializer for Poll model.
    """
    author = AccountSerializer(read_only=True, required=False)
    options = OptionSerializer(read_only=True, many=True)

    class Meta:
        model = Poll
        fields = ('id', 'author', 'question', 'options', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PollSerializer, self).get_validation_exclusions()

        return exclusions + ['author']


class OptionSerializer(serializers.ModelSerializer):
    """ Serializer for Option model.
    """
    class Meta:
        model = Option
        fields = ('id', 'option', 'count', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')
