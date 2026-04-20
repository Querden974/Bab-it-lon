---
title: index
editUrl: false
tags:
  - fog
  - déploiement
  - imaging
  - index
---

# FOG Project — Centre de Ressources

:::tip[Présentation]
**FOG Project** est une solution open-source de clonage et de déploiement d'images système via le réseau. Elle permet de capturer, stocker et déployer des images disque sur des postes clients à partir d'un boot PXE, sans support physique.

Interface web : **http\://\<IP>/fog/management** | Boot PXE : **TFTP** | Stockage images : **/images**

:::

***

:::caution[Prérequis réseau]
Le déploiement FOG repose sur le **boot PXE**, qui nécessite un serveur **DHCP** et un **DNS** correctement configurés sur le réseau.

* Mise en place d'un serveur DHCP → [Mise en place serveur DHCP](/notes/_procédures/centre-de-documents/linux/mise-en-place-serveur-dhcp)
* Mise en place d'un serveur DNS → [Mise en place d'un serveur DNS (Bind9)](/notes/_procédures/centre-de-documents/linux/mise-en-place-dun-serveur-dns-bind9)

:::

***

## Installation & Configuration

:::tip[Serveur FOG]


### [Mise en place serveur FOG](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/mise-en-place-serveur-fog)

Installation complète du serveur FOG sur Debian, configuration du boot PXE et paramétrage de l'interface web.

* Installation depuis les sources GitHub
* Choix du mode (Normal Server / Storage Node)
* Intégration DHCP existant (options 066/067)
* Initialisation de la base de données
* Paramétrage du Menu Timeout iPXE
* Création d'un groupe d'images

:::

***

## Images & Déploiement

:::note[Création d'une image Windows]


### [Création d'une image Windows](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/création-dune-image-windows)

Préparer un master Windows avant la capture.

* Personnalisation du master (logiciels, mises à jour)
* Nettoyage des fichiers système
* Désactivation du démarrage rapide

:::

:::note[Récapitulatif — Capture et Déploiement]


### [Récapitulatif - Capture et Déploiement](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/récapitulatif---capture-et-déploiement)

Toutes les étapes de A à Z pour capturer et déployer une image.

* Créer la définition d'image dans FOG
* Enregistrer les postes via boot PXE
* Lancer les tâches Capture / Deploy
* Déploiement sur groupe de machines
* Sysprep avant capture (production)

:::

***

## Gestion des accès

:::note[Gestion d'utilisateurs]


### [Gestion d'utilisateurs](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/gestion-dutilisateurs)

Créer des comptes utilisateurs, définir des rôles et appliquer des restrictions d'accès via le plugin AccessControl.

* Activation du système de plugins
* Installation du plugin `accesscontrol`
* Création d'utilisateurs et de rôles
* Définition de règles (Host, Task, Image)
* Association rôle ↔ utilisateur

:::

***

## Rappels essentiels

| Élément                       | Valeur par défaut            |
| ----------------------------- | ---------------------------- |
| Identifiants par défaut       | `fog` / `password`           |
| Interface web                 | `http://<IP>/fog/management` |
| Stockage des images           | `/images`                    |
| Boot BIOS                     | `undionly.kpxe`              |
| Boot UEFI 64-bit              | `ipxe.efi`                   |
| Option DHCP next-server (066) | IP du serveur FOG            |
| Option DHCP filename (067)    | Fichier de boot PXE          |

***

:::tip[Flux de mise en place rapide]


1. Vérifier la présence d'un **serveur DHCP** configuré avec les options PXE → [Mise en place serveur DHCP](/notes/_procédures/centre-de-documents/linux/mise-en-place-serveur-dhcp)
2. Vérifier la présence d'un **serveur DNS** → [Mise en place d'un serveur DNS (Bind9)](/notes/_procédures/centre-de-documents/linux/mise-en-place-dun-serveur-dns-bind9)
3. Installer et configurer le **serveur FOG** → [Mise en place serveur FOG](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/mise-en-place-serveur-fog)
4. Préparer le **master Windows** → [Création d'une image Windows](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/création-dune-image-windows)
5. Suivre le **récapitulatif capture/déploiement** → [Récapitulatif - Capture et Déploiement](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/récapitulatif---capture-et-déploiement)
6. Gérer les **accès utilisateurs** selon les besoins → [Gestion d'utilisateurs](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/gestion-dutilisateurs)

:::
