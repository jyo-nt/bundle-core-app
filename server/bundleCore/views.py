from rest_framework import generics
from .models import Package, PackageVersion
from .serializers import PackageSerializer
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

class PackageSearch(generics.ListAPIView):
  serializer_class = PackageSerializer

  def get_queryset(self):
    q = self.request.GET.get('q', '')
    if q:
        packages = Package.objects.filter(Q(name__icontains=q))
    else:
        packages = Package.objects.all()

    return packages
  
  def get_package_info(request, package_id):

    # Retrieve the Package instance
    package = get_object_or_404(Package, id=package_id)

    # Retrieve related package versions for the package name
    versions = PackageVersion.objects.filter(name=package.name)

    package_serializer = PackageSerializer(package)

    package_info = {
        **package_serializer.data,
        'versions': [{'version': version.version, 'download_url': version.download_url} for version in versions]
    }

    return JsonResponse(package_info)
