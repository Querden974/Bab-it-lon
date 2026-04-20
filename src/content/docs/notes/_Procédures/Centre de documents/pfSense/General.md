---
title: General
editUrl: false
---

**Auteur :** Gautier RAYEROUX, Eric JAMET, David GEMAIN  |  **Date :** 08/01/2025

***

## Prérequis

### Généraux

* Installer VMware Workstation (si installation en VM)
* Bases en virtualisation
* Base de réseau informatique
* Télécharger l'image ISO de pfSense

### Matériels minimaux pour pfSense

* CPU 64-bit amd64 (x86-64) compatible
* 1 Go de RAM ou plus
* 8 Go de stockage ou plus
* Une ou plusieurs interfaces réseau
* Une clé USB bootable pour lancer l'installation

### Configuration utilisée (déploiement physique)

* HDD : 500 Go
* RAM : 8 Go
* CPU : 4 cœurs
* 2 cartes réseau (Realtek motherboard, TP-Link)

***

## 1. Installation de pfSense

Démarrer la machine (ou la VM) avec l'image ISO de pfSense montée.

1. Accepter les termes d'utilisation

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 1.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-1.png)

2. Sélectionner **« Install »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 2.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-2.png)

3. Sélectionner le type de partition — choisir **UFS**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 3.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-3.png)

4. Choisir **« Entire Disk »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 4.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-4.png)

5. Sélectionner **« MBR »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 5.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-5.png)

6. Sélectionner **« da0 »**, puis aller sur **« Finish »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 6.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-6.png)

7. Confirmer puis patienter jusqu'à la fin de l'installation

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 7.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-7.png)

8. Une fois l'installation terminée, redémarrer la machine

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 8.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-8.png)

***

## 2. Configuration du premier démarrage (CLI)

1. Activer ou non les VLANs

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 9.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-9.png)

2. Sélectionner l'interface destinée au **WAN**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 10.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-10.png)

3. Sélectionner l'interface destinée au **LAN** (il est possible d'en ajouter d'autres après)

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 11.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-11.png)

4. Taper **« y »** pour procéder à la configuration, puis patienter

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 12.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-12.png)

5. Une fois la configuration initiale terminée, l'interface CLI doit apparaître

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 13.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-13.png)

***

## 3. Ajouter une interface (CLI)

Ajouter une carte réseau à la VM avant de procéder à cette étape.

1. Sélectionner l'option **« 1 »** dans le menu CLI

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 14.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-14.png)

2. Sélectionner **non** pour ne pas paramétrer les VLANs à cette étape

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 15.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-15.png)

3. Sélectionner les interfaces pour le WAN et le LAN

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 16.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-16.png)

4. Taper **« y »** pour valider la configuration, puis patienter

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 17.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-17.png)

***

## 4. Configurer les adresses IPv4 des interfaces (CLI)

1. Sélectionner l'option **« 2 »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 18.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-18.png)

2. Sélectionner le port à paramétrer

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 19.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-19.png)

3. Sélectionner **non** pour configurer en adresse statique (pas via DHCP)

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 20.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-20.png)

4. Entrer l'adresse IPv4

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 21.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-21.png)

5. Entrer le CIDR de l'adresse

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 22.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-22.png)

6. Entrer l'adresse passerelle par défaut si besoin

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 23.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-23.png)

7. Sélectionner **non** pour l'IPv6 en DHCPv6

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 24.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-24.png)

8. Laisser le champ vide pour l'adresse IPv6

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 25.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-25.png)

9. Sélectionner **non** pour activer le DHCP sur WAN

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 26.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-26.png)

10. Sélectionner **non** pour réinitialiser le protocole webConfigurator

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 27.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-27.png)

11. Appuyer sur **Entrée** pour continuer

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 28.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-28.png)

L'interface web du serveur pfSense est maintenant accessible par l'adresse configurée.

***

## 5. Première connexion (interface Web)

1. Utiliser les identifiants par défaut : **`admin` / `pfsense`**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 29.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-29.png)

2. Cliquer sur **« Next »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 30.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-30.png)
![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 31.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-31.png)

3. Renseigner les informations générales (hostname, DNS)

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 32.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-32.png)

4. Définir le fuseau horaire

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 33.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-33.png)

5. Entrer les informations pour la configuration de l'interface WAN, puis cliquer sur **« Next »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 34.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-34.png)

6. Configurer l'interface LAN

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 35.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-35.png)

7. Définir un nouveau mot de passe administrateur

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 36.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-36.png)

8. Recharger la configuration pour appliquer les modifications

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 37.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-37.png)

9. Patienter le temps de l'application

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 38.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-38.png)

10. Cliquer sur **« Finish »** pour terminer la configuration initiale

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 39.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-39.png)

***

## 6. Ajouter un nouvel utilisateur

1. Dans **System** → **User Manager**, cliquer sur **« Add »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 40.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-40.png)
![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 41.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-41.png)

2. Remplir les différents champs, puis cliquer sur **« Save »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 42.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-42.png)

***

## 7. Configurer l'accès à la console

1. Aller dans **System** → **Advanced**, changer le port TCP de pfSense, puis sauvegarder

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 43.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-43.png)
![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 44.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-44.png)

2. Créer une règle DNAT pour accéder à la console via le WAN — aller dans **Firewall** → **NAT**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 45.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-45.png)

3. Dans la section **« Port Forwarding »**, cliquer sur **« Add »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 46.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-46.png)

4. Renseigner les champs pour rediriger la connexion WAN vers l'adresse de pfSense

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 47.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-47.png)

5. Appliquer les changements

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 48.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-48.png)

6. Dans les règles du firewall, la redirection a créé automatiquement une nouvelle règle associée

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 49.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-49.png)

7. Test de connexion à pfSense depuis une VM sur le WAN Segment

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 50.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-50.png)

***

## 8. Ajouter une interface via l'interface graphique

Ajouter une nouvelle carte réseau sur la VM pfSense avant cette étape.

1. Dans **Interfaces** → **Assignments**, cliquer sur **« Add »** sur l'interface disponible

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 51.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-51.png)
![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 52.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-52.png)

2. Cliquer sur la nouvelle interface, remplir les champs, puis cliquer sur **« Save »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 53.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-53.png)

3. Appliquer les changements

![image/Attachments 3/G\_Rayeroux\_Procedure\_PriseEnMainPfsense\_15012026(1) 54.png](../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_priseenmainpfsense_150120261-54.png)
