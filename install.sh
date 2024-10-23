#!/bin/bash
# Installer Docker si ce n'est pas déjà fait
if ! [ -x "$(command -v docker)" ]; then
  echo "Installation de Docker..."
  # Insérer ici la commande d'installation de Docker pour votre système d'exploitation
  echo "Docker installé avec succès!"
fi
# Installer Docker Compose si ce n'est pas déjà fait
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Installation de Docker Compose..."
  # Insérer ici la commande d'installation de Docker Compose pour votre système d'exploitation
  echo "Docker Compose installé avec succès!"
fi
# Installer les dépendances du projet Laravel
echo "Installation des dépendances Laravel..."
composer install
# Démarrer les conteneurs Docker avec Laravel Sail
echo "Démarrage des conteneurs Docker avec Laravel Sail..."
./vendor/bin/sail up -d
# Exécuter les migrations pour créer la base de données
echo "Exécution des migrations Laravel..."
./vendor/bin/sail artisan migrate
# Générer une clé d'application Laravel
echo "Génération de la clé d'application Laravel..."
./vendor/bin/sail artisan key:generate
# L'installation est terminée
echo "L'installation est terminée! Vous pouvez accéder à votre projet Laravel à l'adresse http://localhost."