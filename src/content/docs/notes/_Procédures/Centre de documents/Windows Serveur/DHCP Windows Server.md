---
title: DHCP Windows Server
editUrl: false
---

**Auteur :** Gautier Rayeroux  |  **Date :** 21/04/2026

***

> Le rôle **DHCP (Dynamic Host Configuration Protocol)** attribue automatiquement des adresses IP et d'autres paramètres réseau (masque, passerelle, DNS) aux machines clientes. Cela évite la configuration manuelle de chaque poste.

***

## 1. Installation du rôle DHCP

### 1.1 Via le Gestionnaire de serveur

1. Ouvrir le **Gestionnaire de serveur** → **« Gérer »** → **« Ajouter des rôles et fonctionnalités »**
2. Sélectionner **« Installation basée sur un rôle ou une fonctionnalité »**, puis cliquer sur **« Suivant »**
3. Sélectionner le **serveur de destination**, puis cliquer sur **« Suivant »**
4. Dans la liste des rôles, cocher **« Serveur DHCP »**, confirmer l'ajout des fonctionnalités requises
5. Passer les étapes sans modification, puis cliquer sur **« Installer »**
6. Une fois l'installation terminée, une notification invite à effectuer la **configuration post-installation**

### 1.2 Configuration post-installation (autorisation AD)

7. Cliquer sur la notification **« Terminer la configuration DHCP »**
8. Cliquer sur **« Valider »** — cette étape **autorise le serveur DHCP dans Active Directory**

> Sans cette autorisation, le serveur DHCP ne distribuera pas d'adresses sur un réseau AD. Cela évite qu'un serveur DHCP non autorisé perturbe le réseau.

### 1.3 Via PowerShell

```plain text
Install-WindowsFeature -Name DHCP -IncludeManagementTools
Add-DhcpServerInDC -DnsName "srv-ad.lab.local" -IPAddress 192.168.1.1
```

***

## 2. Concepts clés DHCP

| Terme           | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| **Étendue**     | Plage d'adresses IP pouvant être distribuées sur un sous-réseau        |
| **Exclusion**   | Plage d'adresses exclues de la distribution (ex. IP fixes)             |
| **Réservation** | Adresse IP fixe attribuée à une machine identifiée par son adresse MAC |
| **Bail**        | Durée pendant laquelle un client conserve son adresse IP               |
| **Options**     | Paramètres réseau distribués avec l'IP (passerelle, DNS, etc.)         |
| **Fail-over**   | Mécanisme de haute disponibilité entre deux serveurs DHCP              |

***

## 3. Création d'une étendue DHCP

Une **étendue** définit la plage d'adresses IP qu'un serveur DHCP peut distribuer pour un sous-réseau donné.

### 3.1 Via la console DHCP

9. Ouvrir **Outils → DHCP** dans le Gestionnaire de serveur
10. Développer le serveur, faire un **clic-droit** sur **« IPv4 »** → **« Nouvelle étendue... »**
11. L'assistant de nouvelle étendue s'ouvre — cliquer sur **« Suivant »**
12. Renseigner un **nom** et une **description** pour l'étendue (ex. `LAN-Bureau`), puis cliquer sur **« Suivant »**
13. Définir la **plage d'adresses** :
    * Adresse IP de début (ex. `192.168.1.100`)
    * Adresse IP de fin (ex. `192.168.1.200`)
    * Masque de sous-réseau (ex. `255.255.255.0`)
14. Ajouter des **exclusions** si nécessaire (plages réservées aux équipements à IP fixe)
15. Définir la **durée du bail** :
    * **8 jours** par défaut — adapté à un réseau fixe stable
    * Réduire (ex. 1h) pour un réseau Wi-Fi public avec beaucoup de rotations
16. Configurer les **options DHCP** :
    * **003 - Routeur** : adresse IP de la passerelle (ex. `192.168.1.254`)
    * **006 - Serveurs DNS** : adresse(s) IP du ou des serveurs DNS (ex. `192.168.1.1`)
    * **015 - Nom de domaine DNS** : suffixe DNS (ex. `lab.local`)
17. Activer l'étendue immédiatement en répondant **« Oui »** à la question finale

### 3.2 Via PowerShell

```plain text
Add-DhcpServerv4Scope -Name "LAN-Bureau" -StartRange 192.168.1.100 -EndRange 192.168.1.200 `
  -SubnetMask 255.255.255.0 -LeaseDuration 8.00:00:00 -State Active

Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 `
  -Router 192.168.1.254 `
  -DnsServer 192.168.1.1 `
  -DnsDomain "lab.local"
```

***

## 4. Ajout d'exclusions

Les **exclusions** permettent de réserver une plage d'adresses pour les équipements configurés manuellement (serveurs, imprimantes, routeurs).

18. Dans la console DHCP, développer l'étendue → clic-droit sur **« Pool d'adresses »** → **« Nouvelle plage d'exclusion... »**
19. Renseigner l'**adresse de début** et l'**adresse de fin** à exclure, puis cliquer sur **« Ajouter »**

```plain text
Add-DhcpServerv4ExclusionRange -ScopeId 192.168.1.0 -StartRange 192.168.1.1 -EndRange 192.168.1.99
```

***

## 5. Création d'une réservation

Une **réservation** associe une adresse IP fixe à une machine précise via son **adresse MAC**. La machine recevra toujours la même IP même si le DHCP est actif.

20. Récupérer l'**adresse MAC** de la machine cliente :
    * Sur Windows : `ipconfig /all` → champ **« Adresse physique »**
    * Sur Linux : `ip link show` ou `cat /sys/class/net/eth0/address`
21. Dans la console DHCP, développer l'étendue → clic-droit sur **« Réservations »** → **« Nouvelle réservation... »**
22. Renseigner :
    * **Nom de la réservation** (ex. `imprimante-rdc`)
    * **Adresse IP** souhaitée (ex. `192.168.1.50`)
    * **Adresse MAC** de la machine (sans tirets ni espaces, ex. `00155D010203`)
23. Cliquer sur **« Ajouter »**

```plain text
Add-DhcpServerv4Reservation -ScopeId 192.168.1.0 -IPAddress 192.168.1.50 `
  -ClientId "00-15-5D-01-02-03" -Description "imprimante-rdc"
```

***

## 6. Options DHCP : niveaux de configuration

Les options peuvent être définies à trois niveaux, du plus général au plus spécifique :

| Niveau          | Portée                              | Usage typique                        |
| --------------- | ----------------------------------- | ------------------------------------ |
| **Serveur**     | S'applique à toutes les étendues    | DNS commun à tout le réseau          |
| **Étendue**     | S'applique à une étendue spécifique | Passerelle propre à un VLAN          |
| **Réservation** | S'applique à une machine précise    | Options spéciales pour un équipement |

> Un paramètre défini au niveau **réservation** écrase celui de l'étendue, qui lui-même écrase celui du serveur.

```plain text
# Options au niveau serveur
Set-DhcpServerv4OptionValue -DnsServer 192.168.1.1 -DnsDomain "lab.local"

# Options au niveau étendue
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -Router 192.168.1.254
```

***

## 7. Failover DHCP (haute disponibilité)

Le **failover** permet à deux serveurs DHCP de se partager la charge ou de prendre le relais en cas de panne.

24. Dans la console DHCP, clic-droit sur l'étendue → **« Configurer le basculement... »**
25. Renseigner :
    * L'**adresse IP du serveur partenaire**
    * Le **mode** : `Équilibrage de charge` (actif/actif) ou `Serveur de secours` (actif/passif)
    * Un **secret partagé** pour sécuriser la relation entre les deux serveurs
26. Cliquer sur **« Terminer »**

```plain text
Add-DhcpServerv4Failover -Name "DHCP-Failover" -PartnerServer "srv-dhcp2.lab.local" `
  -ScopeId 192.168.1.0 -Mode LoadBalance -LoadBalancePercent 50 -SharedSecret "MotDePasseSecret"
```

***

## 8. Vérification et tests

### 8.1 Vérifier les baux actifs

```plain text
Get-DhcpServerv4Lease -ScopeId 192.168.1.0
```

### 8.2 Forcer le renouvellement d'un bail depuis un client

```plain text
ipconfig /release
ipconfig /renew
```

### 8.3 Vérifier la configuration reçue par le client

```plain text
ipconfig /all
```

***

## 9. Points importants

* Un réseau ne doit avoir **qu'un seul serveur DHCP actif** (sauf en configuration failover), sous peine de conflits d'adresses.
* Toujours **exclure les adresses des équipements à IP fixe** avant d'activer l'étendue.
* La durée du bail doit être adaptée à l'usage : longue pour un parc stable, courte pour des équipements nomades.
* En environnement AD, penser à **autoriser le serveur DHCP** dans l'annuaire pour qu'il soit opérationnel.
