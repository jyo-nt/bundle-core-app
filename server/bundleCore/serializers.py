from rest_framework import serializers
from .models import Package

class PackageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Package
    fields = '__all__'

  license = serializers.SerializerMethodField()

  def get_license(self, obj):
    license_url = obj.license
    label = license_url.split('/')[-1]
    url = license_url if license_url.startswith('http') else None
    return {'url': url, 'label': label}
