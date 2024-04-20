from django.urls import path
from .views import PackageSearch, PackageDetail

urlpatterns = [
    path("search/", PackageSearch.as_view(), name='package-search'),
    path("id/<int:package_id>/", PackageDetail.as_view(), name='package-detail'),
]