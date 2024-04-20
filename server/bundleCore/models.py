from django.db import models

class Package(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, db_index=True)
    category = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()
    publication = models.TextField()
    license = models.TextField()

    class Meta:
        db_table = 'package_meta'

    def __str__(self):
        # return f"{self.id} {self.name}"
        return f"{self.name}"

class PackageVersion(models.Model):
    name = models.ForeignKey(Package, on_delete=models.CASCADE)
    version = models.CharField(max_length=255)
    download_url = models.URLField()

    class Meta:
        db_table = 'package_version'

    def __str__(self):
        return f"{self.name} - {self.version}"  # Adjusted to directly access the name attribute
