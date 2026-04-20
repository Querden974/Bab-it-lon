---
title: DHCP
editUrl: false
---

**Auteur :** Gautier RAYEROUX, Eric JAMET, David GEMAIN  |  **Date :** 08/01/2025

***

## Contexte

Le DHCP du **VLAN 40 (Wi-Fi)** est géré par pfSense afin de permettre l'activation du portail captif. La passerelle par défaut du VLAN 40 doit pointer vers pfSense.

Pour cela, sur le switch CBS250, désactiver l'interface SVI du VLAN 40 et créer une route statique :

```ios
! Désactiver l'adresse SVI
Interface vlan 40
No ip address
Shutdown
Exit

! Création d'une route vers pfSense
Ip route 192.168.40.0 /24 192.168.40.254
```

Sur le **point d'accès TP-Link**, désactiver également le DHCP interne.

***

## 1. Activer le serveur DHCP pour le VLAN Wifi

1. Aller dans **Services** → **DHCP Server**, puis sélectionner le VLAN **Wi-Fi**
2. Activer le DHCP sur le VLAN
3. Configurer la plage d'adresses et les différents services si nécessaires :
   * Plage : `192.168.40.2` → `192.168.40.254`
   * Passerelle : `192.168.40.1` (interface pfSense sur le VLAN 40)
   * DNS : selon configuration réseau

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 88.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-88.png)
![image/Attachments 3/Installation\_CISCO\_CSB250\_08012025(1) 40.png](../../../../../../assets/notes/image/attachments-3/installation_cisco_csb250_080120251-40.png)

***

## 2. Modifier le DHCP pour la haute disponibilité (CARP)

Si pfSense est configuré en haute disponibilité (voir [Haute Disponibilite](/notes/_procédures/centre-de-documents/pfsense/haute-disponibilite)), modifier la **Gateway** du serveur DHCP pour pointer vers l'adresse virtuelle CARP :

Aller dans **Services** → **DHCP Server**, sélectionner **LAN**, modifier la Gateway avec l'adresse virtuelle créée, puis sauvegarder.

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 69.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-69.png)
