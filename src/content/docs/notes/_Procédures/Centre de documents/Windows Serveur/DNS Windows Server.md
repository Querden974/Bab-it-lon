---
title: DNS Windows Server
editUrl: false
---

**Auteur :** Gautier RAYEROUX  |  **Date :** 2026-04-21 00:00:00

***

> Le rôle **DNS (Domain Name System)** permet de résoudre des noms d'hôtes en adresses IP et inversement. Sur Windows Server, il est souvent installé automatiquement avec Active Directory, mais peut aussi être déployé indépendamment.

***

## 1. Installation du rôle DNS

### 1.1 Via le Gestionnaire de serveur

1. Ouvrir le **Gestionnaire de serveur** → **« Gérer »** → **« Ajouter des rôles et fonctionnalités »**
2. Sélectionner **« Installation basée sur un rôle ou une fonctionnalité »**, puis cliquer sur **« Suivant »**
3. Sélectionner le **serveur de destination**, puis cliquer sur **« Suivant »**
4. Dans la liste des rôles, cocher **« Serveur DNS »**, confirmer l'ajout des fonctionnalités requises, puis cliquer sur **« Suivant »**
5. Passer les étapes sans modification, puis cliquer sur **« Installer »**
6. Une fois l'installation terminée, le rôle est disponible dans **Outils → DNS**

### 1.2 Via PowerShell

```plain text
Install-WindowsFeature -Name DNS -IncludeManagementTools
```

***

## 2. Concepts clés DNS

| Terme                    | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| **Zone directe**         | Résout un nom d'hôte → adresse IP                     |
| **Zone inverse**         | Résout une adresse IP → nom d'hôte                    |
| **Enregistrement A**     | Associe un nom à une adresse IPv4                     |
| **Enregistrement AAAA**  | Associe un nom à une adresse IPv6                     |
| **Enregistrement CNAME** | Alias pointant vers un autre nom d'hôte               |
| **Enregistrement MX**    | Indique le serveur de messagerie du domaine           |
| **Enregistrement PTR**   | Enregistrement inverse (IP → nom)                     |
| **Enregistrement NS**    | Indique le serveur DNS faisant autorité pour une zone |
| **Enregistrement SOA**   | Contient les infos d'autorité de la zone              |

***

## 3. Création d'une zone DNS directe

Une **zone directe** permet de résoudre les noms de votre domaine interne (ex. `lab.local`) en adresses IP.

### 3.1 Via la console DNS

7. Ouvrir **Outils → DNS** dans le Gestionnaire de serveur
8. Faire un **clic-droit** sur **« Zones de recherche directes »** → **« Nouvelle zone... »**
9. L'assistant de nouvelle zone s'ouvre — cliquer sur **« Suivant »**
10. Sélectionner le **type de zone** :
    * **Zone principale** — zone maître modifiable localement (à choisir sur le serveur principal)
    * **Zone secondaire** — copie en lecture seule depuis un autre serveur DNS
    * **Zone de stub** — contient uniquement les enregistrements NS et SOA d'une autre zone
11. Si AD DS est installé, cocher **« Stocker la zone dans Active Directory »** pour une réplication automatique
12. Choisir la **portée de réplication AD** (tous les contrôleurs de domaine de la forêt, du domaine, etc.)
13. Entrer le **nom de la zone** (ex. `lab.local`), puis cliquer sur **« Suivant »**
14. Configurer les **mises à jour dynamiques** :
    * **Sécurisées uniquement** (recommandé avec AD) — seules les machines authentifiées peuvent mettre à jour leurs enregistrements
    * **Sécurisées et non sécurisées** — toute machine peut mettre à jour
    * **Aucune mise à jour dynamique** — enregistrements manuels uniquement
15. Cliquer sur **« Terminer »**

### 3.2 Via PowerShell

```plain text
Add-DnsServerPrimaryZone -Name "lab.local" -ReplicationScope "Domain" -DynamicUpdate "Secure"
```

***

## 4. Création d'une zone DNS inverse

Une **zone inverse** permet de résoudre une adresse IP en nom d'hôte (requêtes PTR). Utile pour les logs, les outils de diagnostic et certains services.

### 4.1 Via la console DNS

16. Faire un **clic-droit** sur **« Zones de recherche inverses »** → **« Nouvelle zone... »**
17. Suivre l'assistant (type de zone, réplication AD identiques à la zone directe)
18. Sélectionner **« Zone de recherche inverse IPv4 »**
19. Entrer l'**ID réseau** correspondant à votre plage (ex. `192.168.1` pour le réseau `192.168.1.0/24`)
20. Configurer les mises à jour dynamiques, puis cliquer sur **« Terminer »**

### 4.2 Via PowerShell

```plain text
Add-DnsServerPrimaryZone -NetworkId "192.168.1.0/24" -ReplicationScope "Domain" -DynamicUpdate "Secure"
```

***

## 5. Ajout d'enregistrements DNS

### 5.1 Enregistrement A (hôte)

21. Dans la console DNS, développer la zone directe, faire un **clic-droit** → **« Nouvel hôte (A ou AAAA)... »**
22. Renseigner :
    * **Nom** : nom de la machine (ex. `srv-web`)
    * **Adresse IP** : adresse IPv4 de la machine (ex. `192.168.1.10`)
    * Cocher **« Créer un enregistrement PTR associé »** pour créer automatiquement l'enregistrement inverse
23. Cliquer sur **« Ajouter un hôte »**

```plain text
Add-DnsServerResourceRecordA -ZoneName "lab.local" -Name "srv-web" -IPv4Address "192.168.1.10" -CreatePtr
```

### 5.2 Enregistrement CNAME (alias)

Un **CNAME** permet de créer un alias pointant vers un autre enregistrement A existant. Pratique pour `www` → `srv-web`.

24. Clic-droit sur la zone → **« Nouvel alias (CNAME)... »**
25. Renseigner le **nom de l'alias** (ex. `www`) et le **nom de domaine complet cible** (ex. `srv-web.lab.local`)

```plain text
Add-DnsServerResourceRecordCName -ZoneName "lab.local" -Name "www" -HostNameAlias "srv-web.lab.local"
```

### 5.3 Enregistrement PTR (inverse)

Créé automatiquement si la case est cochée lors de la création d'un enregistrement A. Sinon, manuellement :

```plain text
Add-DnsServerResourceRecordPtr -ZoneName "1.168.192.in-addr.arpa" -Name "10" -PtrDomainName "srv-web.lab.local"
```

***

## 6. Configuration du redirecteur DNS

Un **redirecteur** indique au serveur DNS vers quel serveur transmettre les requêtes qu'il ne peut pas résoudre localement (ex. Internet).

26. Dans la console DNS, faire un **clic-droit** sur le nom du serveur → **« Propriétés »**
27. Aller dans l'onglet **« Redirecteurs »**, cliquer sur **« Modifier... »**
28. Ajouter les adresses IP des serveurs DNS externes (ex. `8.8.8.8` pour Google, `1.1.1.1` pour Cloudflare)
29. Cliquer sur **« OK »**

```plain text
Add-DnsServerForwarder -IPAddress "8.8.8.8","1.1.1.1"
```

***

## 7. Vérification et tests DNS

### 7.1 Vérifier la résolution depuis un client

```plain text
nslookup srv-web.lab.local
```

```plain text
nslookup 192.168.1.10
```

### 7.2 Forcer la mise à jour des enregistrements DNS d'un client

Sur le client Windows :

```plain text
ipconfig /registerdns
ipconfig /flushdns
```

### 7.3 Vérifier les zones et enregistrements depuis le serveur

```plain text
Get-DnsServerZone
Get-DnsServerResourceRecord -ZoneName "lab.local"
```

***

## 8. Points importants

* Le serveur DNS doit avoir **sa propre adresse IP comme serveur DNS préféré** dans les paramètres réseau, surtout s'il est contrôleur de domaine.
* En environnement AD, les enregistrements DNS sont créés **automatiquement** lors de la jonction au domaine.
* Les **zones intégrées AD** se répliquent entre contrôleurs de domaine sans configuration supplémentaire.
* Utiliser des **noms de domaine internes** (`.local`, `.internal`, `.lan`) pour éviter les conflits avec des domaines publics.
