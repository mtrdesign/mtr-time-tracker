from django.conf.urls import url
from rest_framework import routers
from api.views import CompaniesViewSet, ProjectsViewSet, ProfilesViewSet

from api import views


router = routers.DefaultRouter()
router.register(r"companies", CompaniesViewSet)
router.register(r"projects", ProjectsViewSet)
router.register(r"profiles", ProfilesViewSet)

urlpatterns = router.urls

