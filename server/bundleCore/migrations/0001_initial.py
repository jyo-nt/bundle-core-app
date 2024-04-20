# Generated by Django 4.0.4 on 2024-03-27 09:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(db_index=True, max_length=255)),
                ('category', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('url', models.URLField()),
                ('publication', models.TextField()),
                ('license', models.TextField()),
            ],
            options={
                'db_table': 'package_meta',
            },
        ),
        migrations.CreateModel(
            name='PackageVersion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.CharField(max_length=255)),
                ('download_url', models.URLField()),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bundleCore.package')),
            ],
            options={
                'db_table': 'package_version',
            },
        ),
    ]
