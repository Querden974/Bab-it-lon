---
title: index
editUrl: false
tags:
  - index
  - dashboard
  - tssr
---

# TSSR — Dashboard

:::tip[Vue d'ensemble]
Vault de notes de la formation **TSSR** (Technicien Supérieur Systèmes et Réseaux).
Couvre l'administration système Windows/Linux, les réseaux Cisco, le scripting, la virtualisation et la supervision.
:::

***

## Administration Windows

:::tip[Active Directory & PowerShell]


* [🧑‍💼 Active Directory (Niveau 1 et 2)](/notes/_procédures/centre-de-documents/windows-serveur/-active-directory-niveau-1-et-2) — Concepts AD, utilisateurs, groupes, OUs
* [\_Procédures/Centre de documents/Powershell/index](/notes/_procédures/centre-de-documents/powershell/index) — Scripts, AD, GPO, ACL, mode Core

:::

:::tip[Outils & Références Windows]


* [Commandes Windows](/notes/essentiels/commandes-windows) — CMD et commandes système essentielles
* [🛠️ Utilitaires système indispensables](/notes/essentiels/️-utilitaires-système-indispensables) — Outils de diagnostic et d'administration

:::

***

## Scripting & Développement

:::note[Shell Linux]


* [\_Procédures/Centre de documents/Bash/index](/notes/_procédures/centre-de-documents/bash/index) — Variables, conditions, boucles, fonctions, trap

:::

:::note[Outils Dev]


* [Regex](/notes/_procédures/centre-de-documents/regex) — Expressions régulières
* [Ansible](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/ansible) — Automatisation et déploiement

:::

***

## Réseau

:::note[Fondamentaux]


* [Bases des Réseaux Informatiques](/notes/essentiels/bases-des-réseaux-informatiques) — Modèles OSI/TCP-IP, protocoles
* [Calcul sous-réseau](/notes/essentiels/calcul-sous-réseau) — CIDR, masques, découpage (FLSM)
* [VLSM - Découpage réseau](/notes/essentiels/vlsm---découpage-réseau) — Découpage variable, astuces VLSM
* [Domaine de collision et de diffusion](/notes/essentiels/domaine-de-collision-et-de-diffusion) — Segmentation réseau

:::

:::note[VLANs & Routage]


* [Paramétrer les VLAN](/notes/_procédures/centre-de-documents/cisco-packet-tracer/paramétrer-les-vlan) — Création, accès, trunk
* [Utiliser les VLAN pour réduire les domaines de diffusion](/notes/essentiels/utiliser-les-vlan-pour-réduire-les-domaines-de-diffusion)
* [Routage Inter-Vlan](/notes/_procédures/centre-de-documents/cisco-packet-tracer/routage-inter-vlan) — Router-on-a-stick, SVI
* [\_Procédures/Centre de documents/Cisco packet Tracer/index](/notes/_procédures/centre-de-documents/cisco-packet-tracer/index) — Config IOS, DHCP, SSH, VLANs

:::

:::note[Routage dynamique]


Voir le centre de ressources Routage dans les procédures :

* [🦽Routage - RIP](/notes/_procédures/centre-de-documents/routage/routage---rip) — Vecteur de distance, 15 sauts max
* [🚗Routage - EIGRP](/notes/_procédures/centre-de-documents/routage/routage---eigrp) — Hybride Cisco, algorithme DUAL
* [🏍Routage - OSPF](/notes/_procédures/centre-de-documents/routage/routage---ospf) — État de liens, areas
* [Synthèse - Protocoles de Routage Dynamique](/notes/_procédures/centre-de-documents/routage/synthèse---protocoles-de-routage-dynamique)

:::

***

## Infrastructure & Virtualisation

:::caution[Conteneurisation]


* [\_Procédures/Centre de documents/Docker/index](/notes/_procédures/centre-de-documents/docker/index) — Images, conteneurs, Docker Compose

:::

:::caution[Déploiement]


* [\_Procédures/Centre de documents/Sauvegarde et Deploiement/Fog/index](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/fog/index) — Clonage réseau, PXE, images Windows

:::

:::caution[Automatisation]


* [Ansible](/notes/_procédures/centre-de-documents/sauvegarde-et-deploiement/ansible) — Playbooks, inventaires, modules

:::

***

## Supervision

:::note[Zabbix]


* [\_Procédures/Centre de documents/Zabbix/index](/notes/_procédures/centre-de-documents/zabbix/index) — Supervision réseau et système, alertes, SNMP, LLD
  * [Installation serveur Zabbix](/notes/_procédures/centre-de-documents/zabbix/installation-serveur-zabbix) · [Installation agent Zabbix passif (Linux)](/notes/_procédures/centre-de-documents/zabbix/installation-agent-zabbix-passif-linux)
  * [SNMP Cisco](/notes/_procédures/centre-de-documents/zabbix/snmp-cisco) · [Sondes Personnalisées](/notes/_procédures/centre-de-documents/zabbix/sondes-personnalisées) · [Alertes et Notifications](/notes/_procédures/centre-de-documents/zabbix/alertes-et-notifications)

:::

***

## Procédures & Ressources

:::tip[Procédures pas-à-pas]


* [Administration Active Directory](/notes/_procédures/centre-de-documents/windows-serveur/administration-active-directory) — Gestion AD en procédure guidée
* [Installation Windows Server 2019](/notes/_procédures/centre-de-documents/windows-serveur/installation-windows-server-2019)
* [Mise en place serveur DHCP](/notes/_procédures/centre-de-documents/linux/mise-en-place-serveur-dhcp)
* [Mise en place d'un serveur DNS (Bind9)](/notes/_procédures/centre-de-documents/linux/mise-en-place-dun-serveur-dns-bind9)
* [Installer un serveur GLPI sous Ubuntu](/notes/_procédures/centre-de-documents/linux/glpi/installer-un-serveur-glpi-sous-ubuntu)
* [Installation d'applications Docker](/notes/_procédures/centre-de-documents/docker/installation-dapplications-docker)
* [Mise en place d'une machine virtuelle](/notes/_procédures/centre-de-documents/windows/mise-en-place-dune-machine-virtuelle)
* [Connexion au bureau à distance](/notes/_procédures/centre-de-documents/windows/connexion-au-bureau-à-distance)
* [Mise en place d'un serveur temps avec Chrony](/notes/_procédures/centre-de-documents/linux/mise-en-place-dun-serveur-temps-avec-chrony)

:::
