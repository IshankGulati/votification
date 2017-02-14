from __future__ import unicode_literals

from django.db import models

from authentication.models import Account


class Poll(models.Model):
    """ Model class for polls.
    """
    author = models.ForeignKey(Account, on_delete=models.CASCADE)
    question = models.TextField(max_length=150, blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.question)

    class Meta:
        # latest poll is fetched first
        ordering = ('-created_at',)


class Option(models.Model):
    """ Model class for options of a poll.
    """
    option = models.TextField(max_length=20, blank=False)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='options')
    count = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.option)

    class Meta:
        # option which is added first is fetched first
        ordering = ('created_at',)
