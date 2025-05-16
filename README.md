# Murney House B&B Website Project

## Overview

This project is a bilingual (English/French) Bed & Breakfast website built with Drupal 10, designed to showcase rooms, amenities, pricing, booking, guest services, local attractions, and more. The site is containerized using Docker for ease of local development and deployment.

---

## Features

- Fully bilingual site with language toggle (EN/FR)
- Responsive design with light/dark mode toggle
- Booking system with calendar and guest form
- Guest services hub with appliance how-to guides and QR codes
- Local attractions interactive map and suggested itineraries
- Reviews with admin moderation
- Custom 404 error page with asynchronous error reporting
- Accessibility features including ARIA attributes and high contrast mode
- Performance optimizations like lazy loading and WebP images

---

## Site Structure

### Main Navigation

- Home / Accueil
- Rooms / Chambres
- Amenities / Équipements
- Pricing / Tarifs
- Booking / Réservation
- Guest Services / Services aux clients  
  - How-to Hub / Guide d’utilisation (individual appliance pages)
- House Rules / Règlement intérieur
- Local Attractions / Attractions locales
- Reviews / Avis
- Contact Us / Contact

### Additional Pages

- 404 Error Page with reporting feature

---

## Technical Stack

- **Drupal:** Latest stable release (Drupal 10.x)
- **Database:** MariaDB 10.6 (via Docker container)
- **Web Server:** Apache (included in Drupal official image)
- **Languages:** English and French via Drupal multilingual modules
- **Containerization:** Docker + Docker Compose
- **Version Control:** GitHub repository (to be initialized)

---

## Local Development Setup

### Prerequisites

- Rocky Linux or compatible Linux distribution
- Docker Engine installed and running
- Docker Compose installed

### Getting Started

1. Clone the GitHub repository or create a project folder locally.

2. Create the following `docker-compose.yml` file in your project root:

```yaml
version: '3.8'

services:
  drupal:
    image: drupal:latest
    ports:
      - "8080:80"
    volumes:
      - drupal_data:/var/www/html
    depends_on:
      - db

  db:
    image: mariadb:10.6
    environment:
      MYSQL_ROOT_PASSWORD: example_root_password
      MYSQL_DATABASE: drupal
      MYSQL_USER: drupaluser
      MYSQL_PASSWORD: drupalpass
    volumes:
      - db_data:/var/lib/mysql

volumes:
  drupal_data:
  db_data:

