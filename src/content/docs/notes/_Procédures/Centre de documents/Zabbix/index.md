---
title: index
editUrl: false
tags:
  - zabbix
  - monitoring
  - index
---

# Zabbix — Centre de Ressources

:::tip[Présentation]
**Zabbix** est une solution open-source de supervision réseau et système. Elle permet de surveiller la disponibilité, les performances et l'intégrité des infrastructures IT en temps réel, avec alertes, graphiques et tableaux de bord.

Port agent passif : **10050/TCP** | Port serveur : **10051/TCP** | Interface web : **HTTP/HTTPS**

:::

***

## Installation & Configuration

:::tip[Serveur]


### [Installation serveur Zabbix](/notes/_procédures/centre-de-documents/zabbix/installation-serveur-zabbix)

Installation complète du serveur Zabbix sur Debian avec MariaDB, Nginx et l'interface web.

* Dépôt Zabbix + paquets
* Base de données MariaDB
* Configuration Nginx
* Interface web & premier utilisateur

:::

:::tip[Agent]


### [Installation agent Zabbix passif (Linux)](/notes/_procédures/centre-de-documents/zabbix/installation-agent-zabbix-passif-linux)

Déploiement d'un agent passif sur une machine Linux à superviser.

* Installation du paquet agent
* Configuration `zabbix_agentd.conf`
* Ouverture pare-feu (port 10050)
* Déclaration de l'hôte dans l'UI

:::

***

## Supervision & Collecte

:::note[Protocole SNMP]


### [SNMP Cisco](/notes/_procédures/centre-de-documents/zabbix/snmp-cisco)

Supervision d'équipements réseau Cisco CBS 250 via SNMP depuis Zabbix.

* Activation SNMP sur le switch
* Community string
* Template SNMP dans Zabbix
* Port UDP 161

:::

:::note[Métriques personnalisées]


### [Sondes Personnalisées](/notes/_procédures/centre-de-documents/zabbix/sondes-personnalisées)

Étendre les capacités de l'agent avec des UserParameters.

* Définition de `UserParameter`
* Scripts de collecte custom
* Intégration dans les items Zabbix
* Tests avec `zabbix_agentd -t`

:::

***

## Découverte & Prototypes

:::note[Prototypes LLD (Item, Trigger, Graph)]


### [Prototypes LLD (Item, Trigger, Graph)](/notes/_procédures/centre-de-documents/zabbix/prototypes-lld-item-trigger-graph)

Créer automatiquement des items, triggers et graphiques via le **Low-Level Discovery**.

* Règle de découverte (clé `vfs.fs.discovery`, `net.if.discovery`…)
* Item prototype avec macros `{#NOM}`
* Trigger prototype avec sévérité et expression
* Graph prototype multi-métriques

:::

***

## Alertes & Réactivité

:::caution[Alertes et Notifications]


### [Alertes et Notifications](/notes/_procédures/centre-de-documents/zabbix/alertes-et-notifications)

Configurer des triggers et des actions pour être notifié en cas d'incident.

```
Trigger déclenché → Action évaluée → Opération exécutée → Notification envoyée
```

* Création et gestion des triggers
* Sévérités : Information / Warning / Average / High / Disaster
* Actions : e-mail, webhook, script
* Fenêtres de maintenance

:::

***

## Rappels essentiels

| Élément                 | Valeur par défaut                   |
| ----------------------- | ----------------------------------- |
| Identifiants par défaut | `Admin` / `zabbix`                  |
| Port agent (passif)     | `10050/TCP`                         |
| Port serveur            | `10051/TCP`                         |
| Interface web           | `http://<IP>:<port>`                |
| Config agent            | `/etc/zabbix/zabbix_agentd.conf`    |
| Config serveur          | `/etc/zabbix/zabbix_server.conf`    |
| Logs agent              | `/var/log/zabbix/zabbix_agentd.log` |
| Logs serveur            | `/var/log/zabbix/zabbix_server.log` |

***

:::tip[Flux de mise en place rapide]


1. Installer le **serveur** → [Installation serveur Zabbix](/notes/_procédures/centre-de-documents/zabbix/installation-serveur-zabbix)
2. Déployer un **agent** sur chaque hôte → [Installation agent Zabbix passif (Linux)](/notes/_procédures/centre-de-documents/zabbix/installation-agent-zabbix-passif-linux)
3. Ajouter les hôtes dans l'**interface web** et assigner un template
4. Configurer les **triggers** et **alertes** → [Alertes et Notifications](/notes/_procédures/centre-de-documents/zabbix/alertes-et-notifications)
5. Créer des **sondes custom** si besoin → [Sondes Personnalisées](/notes/_procédures/centre-de-documents/zabbix/sondes-personnalisées)

:::
