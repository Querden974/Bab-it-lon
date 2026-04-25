---
title: index
editUrl: false
tags:
  - pfsense
  - réseau
  - firewall
  - index
---

**Auteur :** \['Gautier RAYEROUX', 'Eric JAMET', 'David GEMAIN']  |  **Date :** 2025-01-08

# pfSense — Centre de Ressources

:::tip[Présentation]
**pfSense** est un pare-feu et routeur open source basé sur FreeBSD. Il offre des fonctionnalités avancées de filtrage, de routage, de VPN, de haute disponibilité et de supervision réseau, le tout administrable via une interface web. Cette section couvre l'installation, la configuration et les différents services disponibles.
:::

***

## Mise en place

:::tip[Général]


### [General](/notes/_procédures/centre-de-documents/pfsense/general)

Installation complète et configuration initiale de pfSense.

* Installation depuis ISO (VM ou physique)
* Configuration des interfaces WAN / LAN via CLI
* Wizard de première connexion Web
* Création d'utilisateurs et gestion de la console

:::

:::tip[Routage]


### [Routage](/notes/_procédures/centre-de-documents/pfsense/routage)

Gestion des routes statiques et des passerelles.

* Création des routes statiques par VLAN
* Création et gestion des gateways LAN / WAN
* Sélection de la passerelle par défaut

:::

:::tip[VLANs]


### [\_Procédures/Centre de documents/pfSense/VLANs](/notes/_procédures/centre-de-documents/pfsense/vlans)

Segmentation réseau par VLANs directement dans pfSense.

* Création des VLANs (ID, port parent, priorité 802.1p)
* Création des interfaces VLAN avec adresses IP statiques
* Activation du DHCP par VLAN

:::

***

## Sécurité & Filtrage

:::caution[Pare-feu]


### [Pare-feu](/notes/_procédures/centre-de-documents/pfsense/pare-feu)

Création et gestion des règles de filtrage, NAT et DMZ.

* Règles de pare-feu par interface (Action / Source / Destination / Port)
* Redirections de port (NAT Port Forward)
* Configuration d'une DMZ (flux entrants, sortants, NAT Outbound)
* Désactivation du NAT (routage délégué au switch)

:::

:::caution[RADIUS]


### [RADIUS](/notes/_procédures/centre-de-documents/pfsense/radius)

Serveur d'authentification centralisé avec FreeRADIUS.

* Installation du package **freeradius3**
* Configuration de l'interface d'écoute
* Création des NAS/Clients et des utilisateurs
* Serveur d'authentification (MS-CHAPv2)
* Test via **Diagnostics → Authentication**
* Intégration avec OpenVPN et le portail captif

:::

:::caution[VPN]


### [VPN](/notes/_procédures/centre-de-documents/pfsense/vpn)

Accès distant sécurisé via OpenVPN.

* Création de l'autorité de certification (CA)
* Création du certificat serveur
* Configuration du serveur OpenVPN (full tunnel / split-tunnel)
* Export de la configuration client
* Règles firewall WAN + interface OpenVPN
* Test de connexion RDP via VPN

:::

***

## Services Réseau

:::note[DHCP]


### [\_Procédures/Centre de documents/pfSense/DHCP](/notes/_procédures/centre-de-documents/pfsense/dhcp)

Attribution automatique d'adresses IP par pfSense.

* Serveur DHCP dédié au VLAN Wi-Fi (VLAN 40)
* Configuration de la plage, passerelle et DNS
* Adaptation pour la haute disponibilité CARP

:::

:::note[Portail Captif]


### [Portail Captif](/notes/_procédures/centre-de-documents/pfsense/portail-captif)

Authentification obligatoire des utilisateurs Wi-Fi avant accès Internet.

* Création d'une zone de portail captif
* Sélection des interfaces concernées
* Personnalisation des images / logo
* Authentification RADIUS ou locale

:::

***

## Avancé

:::tip[Haute Disponibilité (CARP)]


### [Haute Disponibilite](/notes/_procédures/centre-de-documents/pfsense/haute-disponibilite)

Redondance active/passive entre deux pfSense via le protocole CARP.

* Configuration MAÎTRE / ESCLAVE
* Création des Virtual IPs partagées
* Synchronisation de la configuration
* Règles NAT Outbound et firewall CARP / XML-RPC
* Test de bascule automatique

:::

:::note[Logs]


### [Logs](/notes/_procédures/centre-de-documents/pfsense/logs)

Consultation et export des journaux d'événements.

* **Status → System Logs** pour analyser le trafic
* Téléchargement d'un fichier log spécifique via **Diagnostics → Command Prompt**
* Archivage complet du dossier `/var/log` en `.zip`

:::

***

## Comparatif des services

| Module              | Protocole / Package | Interface pfSense                |
| ------------------- | ------------------- | -------------------------------- |
| Routage             | Static / IPv4       | System → Routing                 |
| VLANs               | 802.1Q              | Interfaces → Assignments → VLANs |
| Pare-feu            | PF                  | Firewall → Rules                 |
| NAT                 | PF                  | Firewall → NAT                   |
| RADIUS              | FreeRADIUS 3        | Services → FreeRADIUS            |
| VPN                 | OpenVPN             | VPN → OpenVPN                    |
| DHCP                | ISC DHCP            | Services → DHCP Server           |
| Portail Captif      | —                   | Services → Captive Portal        |
| Haute Disponibilité | CARP                | System → High Availability       |
| Logs                | syslog              | Status → System Logs             |

***

:::tip[Identifiants par défaut]
Lors de la première connexion à l'interface Web :

| Compte       | Valeur    |
| ------------ | --------- |
| Utilisateur  | `admin`   |
| Mot de passe | `pfsense` |

Changer le mot de passe dès la fin du wizard de configuration initiale.

:::
