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
  
class PackageDetail(generics.RetrieveAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    print ("======")
    def get(self, request, package_id):
        package = get_object_or_404(Package, id=package_id)
        versions = PackageVersion.objects.filter(name=package)
        package_serializer = PackageSerializer(package)
        package_info = {
            **package_serializer.data,
            'versions': [{'version': version.version, 'download_url': version.download_url} for version in versions]
        }
        return JsonResponse(package_info)