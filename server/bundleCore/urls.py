from django.urls import path
from .views import PackageSearch

urlpatterns = [
    path("search/", PackageSearch.as_view()),
    path('id/<int:package_id>/', PackageSearch.get_package_info, name='get_package_info'),
]