# load_data.py

import csv
from django.core.management.base import BaseCommand
from bundleCore.models import Package, PackageVersion

class Command(BaseCommand):
  help = 'Load data from CSV files'

  def add_arguments(self, parser):
    parser.add_argument('data_type', type=str, help='Type of data: metadata or version')
    parser.add_argument('file_path', type=str, help='Path to the CSV file')

  def handle(self, *args, **kwargs):
    data_type = kwargs['data_type']
    file_path = kwargs['file_path']
    
    if data_type == 'metadata':
      self.load_package_metadata(file_path)
    elif data_type == 'versions':
      self.load_package_versions(file_path)
    else:
      self.stdout.write(self.style.ERROR('Invalid type provided'))

  def load_package_metadata(self, file_path):
    with open(file_path, 'r') as csvfile:
      reader = csv.DictReader(csvfile)
      for row in reader:
        print("Adding: ", row["Name"])
        Package.objects.create(
          name=row['Name'],
          category=row['Category'],
          description=row['Description'],
          url=row['Url'],
          publication=row['Publication'],
          license=row['License']
        )
    self.stdout.write(self.style.SUCCESS('Package metadata loaded successfully'))

  def load_package_versions(self, file_path): 
    with open(file_path, 'r') as csvfile:
      reader = csv.DictReader(csvfile)
      for row in reader:
        package_name = row['Name']
        print("Adding: ", package_name)
        try:
          package = Package.objects.get(name=package_name)
          PackageVersion.objects.create(
            name=package,
            version=row['Version'],
            download_url=row['Download_url']
          )
        except Package.DoesNotExist:
          self.stdout.write(self.style.WARNING(f"No package found with name {package_name}"))
    self.stdout.write(self.style.SUCCESS('Package versions loaded successfully'))
