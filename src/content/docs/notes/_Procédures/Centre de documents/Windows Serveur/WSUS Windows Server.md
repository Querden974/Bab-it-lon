---
title: WSUS Windows Server
editUrl: false
---

**Auteur :** Gautier RAYEROUX  |  **Date :** 2026-04-21 00:00:00

***

> **WSUS (Windows Server Update Services)** est un rôle Windows Server qui permet de centraliser la gestion des mises à jour Microsoft pour tous les postes et serveurs du réseau. Au lieu que chaque machine télécharge ses mises à jour directement depuis Internet, elles les récupèrent depuis le serveur WSUS interne — ce qui réduit la consommation de bande passante et permet à l'administrateur de contrôler quelles mises à jour sont déployées, sur quelles machines et à quel moment.

***

## 1. Prérequis

| Élément             | Recommandation                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| **OS**              | Windows Server 2016 / 2019 / 2022                                                                             |
| **RAM**             | 4 Go minimum (8 Go recommandés)                                                                               |
| **Espace disque**   | 40 Go minimum pour le stockage des mises à jour (prévoir 100–200 Go en production)                            |
| **Base de données** | WID (Windows Internal Database) suffisant jusqu'à \~500 clients — SQL Server pour les grandes infrastructures |
| **Rôle IIS**        | Installé automatiquement avec WSUS                                                                            |
| **Réseau**          | Accès Internet sur le port `443` (HTTPS) vers `windowsupdate.microsoft.com`                                   |

***

## 2. Installation du rôle WSUS

### 2.1 Via le Gestionnaire de serveur

1. Ouvrir le **Gestionnaire de serveur** → **« Gérer »** → **« Ajouter des rôles et fonctionnalités »**
2. Sélectionner **« Installation basée sur un rôle ou une fonctionnalité »**, puis **« Suivant »**
3. Sélectionner le **serveur de destination**, puis **« Suivant »**
4. Dans la liste des rôles, cocher **« Windows Server Update Services »** — confirmer l'ajout d'IIS et des autres dépendances
5. Passer les étapes **Fonctionnalités** et **Services de rôle** sans modification
6. Dans l'étape **« Contenu »**, définir le **répertoire de stockage des mises à jour** (ex. `D:\WSUS\UpdateServicesPackages`)
   > Choisir un disque avec suffisamment d'espace — ce dossier peut grossir rapidement. Ne pas le placer sur `C:\`.
7. Cliquer sur **« Installer »**, puis **patienter**

### 2.2 Via PowerShell

```plain text
Install-WindowsFeature -Name UpdateServices -IncludeManagementTools

# Post-installation : configurer le dossier de stockage et la base WID
& "C:\Program Files\Update Services\Tools\WsusUtil.exe" postinstall CONTENT_DIR=D:\WSUS\UpdateServicesPackages
```

***

## 3. Configuration initiale de WSUS (assistant de démarrage)

Après l'installation, un **assistant de configuration** se lance automatiquement (ou via **Outils → Windows Server Update Services**).

### 3.1 Choisir la source de synchronisation

8. Sélectionner **« Synchroniser depuis Microsoft Update »** (serveur WSUS upstream) pour un premier serveur
   > En cas de hiérarchie WSUS (plusieurs sites), un serveur peut synchroniser depuis un autre serveur WSUS parent — utile pour les sites avec peu de bande passante.

### 3.2 Configurer un proxy (si nécessaire)

9. Si le serveur passe par un proxy pour accéder à Internet, renseigner l'**adresse et le port** du proxy, ainsi que les **identifiants** si nécessaire

### 3.3 Choisir les langues

10. Sélectionner **uniquement les langues nécessaires** (ex. `Français`) pour limiter l'espace disque utilisé

### 3.4 Choisir les produits à mettre à jour

11. Cocher uniquement les **produits présents dans le parc** — inutile de télécharger les mises à jour pour des OS non utilisés

Produits courants à cocher :

* `Windows 10`
* `Windows 11`
* `Windows Server 2019`
* `Windows Server 2022`
* `Microsoft 365 Apps / Office`
* `Microsoft Defender Antivirus`

### 3.5 Choisir les classifications de mises à jour

12. Sélectionner les types de mises à jour à synchroniser :

| Classification                        | Description                                                | Recommandation        |
| ------------------------------------- | ---------------------------------------------------------- | --------------------- |
| **Mises à jour critiques**            | Correctifs pour problèmes critiques non liés à la sécurité | ✅ Oui                 |
| **Mises à jour de sécurité**          | Correctifs pour failles de sécurité                        | ✅ Oui                 |
| **Service Packs**                     | Cumul de mises à jour                                      | ✅ Oui                 |
| **Mises à jour**                      | Corrections de bugs non critiques                          | ✅ Oui                 |
| **Mises à jour de définitions**       | Signatures antivirus (Defender)                            | ✅ Oui                 |
| **Pilotes**                           | Drivers matériels via Windows Update                       | ⚠️ Optionnel          |
| **Mises à niveau de fonctionnalités** | Passage Windows 10 → 11, upgrades majeurs                  | ⚠️ À évaluer          |
| **Outils**                            | Utilitaires Microsoft                                      | ❌ Rarement nécessaire |

### 3.6 Planifier la synchronisation

13. Activer la **synchronisation automatique** et choisir une heure creuse (ex. `3h00` chaque nuit)
14. Définir le **nombre de synchronisations par jour** (1 suffit pour la plupart des environnements)

### 3.7 Lancer la première synchronisation

15. Cocher **« Commencer la synchronisation initiale »**, puis cliquer sur **« Terminer »**
    > La première synchronisation peut prendre plusieurs heures selon la bande passante et le nombre de produits sélectionnés.

***

## 4. Groupes d'ordinateurs WSUS

Les **groupes WSUS** permettent de cibler les déploiements de mises à jour (ex. d'abord les serveurs de test, puis la production).

### 4.1 Créer des groupes

16. Dans la console WSUS, développer **« Ordinateurs »** → clic-droit sur **« Tous les ordinateurs »** → **« Ajouter un groupe d'ordinateurs... »**
17. Créer les groupes selon votre organisation, par exemple :

```
Tous les ordinateurs
├── Serveurs
│   ├── Serveurs-Test
│   └── Serveurs-Production
└── Postes de travail
    ├── Postes-Pilote
    └── Postes-Production
```

### 4.2 Affecter des machines aux groupes

Deux méthodes :

**Méthode 1 — Côté serveur (manuel via console)**
18\. Dans la console WSUS → **« Ordinateurs »**, faire un **clic-droit** sur une machine → **« Modifier l'appartenance »**
19\. Cocher le groupe cible, puis cliquer sur **« OK »**

**Méthode 2 — Côté client (via GPO, recommandé en entreprise)**

> Voir section **[6. Configuration des clients via GPO](#6-configuration-des-clients-via-gpo)**

***

## 5. Approbation et déploiement des mises à jour

### 5.1 Comprendre les statuts de mises à jour

| Statut            | Signification                                                               |
| ----------------- | --------------------------------------------------------------------------- |
| **Non approuvée** | La mise à jour n'est pas distribuée aux clients                             |
| **Approuvée**     | La mise à jour est distribuée et installée selon la planification du client |
| **Refusée**       | La mise à jour est explicitement exclue (ex. mise à jour problématique)     |

### 5.2 Approuver des mises à jour manuellement

20. Dans la console WSUS → **« Mises à jour »**, filtrer par **« Mises à jour non approuvées »**
21. Sélectionner une ou plusieurs mises à jour, faire un **clic-droit** → **« Approuver... »**
22. Choisir le **groupe cible** et l'action **« Approuvée pour installation »**, puis cliquer sur **« OK »**

### 5.3 Règles d'approbation automatique

Pour approuver automatiquement certaines catégories (ex. définitions Defender) sans intervention manuelle :

23. Dans la console WSUS → **« Options »** → **« Approbations automatiques »**
24. Cliquer sur **« Nouvelle règle... »**
25. Configurer :
    * **Condition :** `Quand une mise à jour est dans une classification spécifique` → `Mises à jour de définitions`
    * **Action :** `Approuver la mise à jour pour un groupe` → `Tous les ordinateurs`
    * **Nom :** `Auto-Approve-Definitions`
26. Cliquer sur **« OK »**, puis sur **« Exécuter la règle »** pour l'appliquer immédiatement

***

## 6. Configuration des clients via GPO

La GPO permet de pointer automatiquement tous les postes vers le serveur WSUS sans configuration manuelle.

**Nom suggéré :** `GPO-Ordi-WSUS`
**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Windows Update`

| Paramètre                                                                | Valeur                             | Explication                                                                                                                                     |
| ------------------------------------------------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Spécifier l'emplacement intranet du service de mise à jour Microsoft** | `Activé`                           | Renseigner `http://srv-wsus:8530` dans les deux champs (serveur de mise à jour ET serveur de statistiques)                                      |
| **Configurer les mises à jour automatiques**                             | `Activé` → option `4`              | `4` = téléchargement auto + notification pour installation. Option `3` = notification seulement. Option `5` = autoriser l'admin local à choisir |
| **Planifier l'installation des mises à jour automatiques**               | `Activé` → Tous les jours à `3:00` | Installation pendant les heures creuses                                                                                                         |
| **Ne pas redémarrer automatiquement avec des utilisateurs connectés**    | `Activé`                           | Évite les redémarrages intempestifs pendant le travail                                                                                          |
| **Permettre aux non-administrateurs de recevoir les notifications**      | `Activé`                           | Les utilisateurs standard voient les notifications de mises à jour                                                                              |
| **Méthode de détection de la fréquence des mises à jour automatiques**   | `Activé` → `22` heures             | Fréquence à laquelle le client vérifie les nouvelles mises à jour                                                                               |

### Affecter les machines à un groupe WSUS via GPO

**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Windows Update`

| Paramètre                          | Valeur                                                  |
| ---------------------------------- | ------------------------------------------------------- |
| **Activer le ciblage côté client** | `Activé` → nom du groupe WSUS (ex. `Postes-Production`) |

> Le nom doit correspondre **exactement** au nom du groupe créé dans la console WSUS. Cette méthode est bien plus efficace que l'affectation manuelle machine par machine.

***

## 7. Nettoyage et maintenance

Le stockage WSUS peut rapidement occuper plusieurs dizaines de Go si on ne le nettoie pas régulièrement.

### 7.1 Assistant de nettoyage du serveur

27. Dans la console WSUS → **« Options »** → **« Assistant de nettoyage du serveur »**
28. Cocher toutes les options :
    * **Ordinateurs inutilisés** — supprime les machines qui ne se sont pas connectées depuis 30 jours
    * **Mises à jour inutiles et fichiers de mise à jour** — supprime les fichiers des mises à jour expirées ou refusées
    * **Mises à jour expirées** — supprime les mises à jour remplacées par des versions plus récentes
    * **Mises à jour remplacées** — supprime les mises à jour obsolètes
    * **Fichiers de mise à jour inutilisés** — libère de l'espace disque
29. Cliquer sur **« Suivant »** et patienter

> Effectuer ce nettoyage une fois par mois. La première exécution peut prendre très longtemps si WSUS n'a jamais été nettoyé.

### 7.2 Via PowerShell (planifiable)

```plain text
# Lancer le nettoyage WSUS en PowerShell
$wsus = Get-WsusServer
$cleanupScope = New-Object Microsoft.UpdateServices.Administration.CleanupScope
$cleanupScope.CleanupObsoleteComputers = $true
$cleanupScope.CleanupObsoleteUpdates = $true
$cleanupScope.CleanupUnneededContentFiles = $true
$cleanupScope.CompressUpdates = $true
$cleanupScope.DeclineExpiredUpdates = $true
$cleanupScope.DeclineSupersededUpdates = $true
$cleanupManager = $wsus.GetCleanupManager()
$cleanupManager.PerformCleanup($cleanupScope)
```

### 7.3 Recalculer les statistiques

Si la console WSUS affiche des chiffres incohérents :

```plain text
Get-WsusServer | Invoke-WsusServerCleanup -CleanupObsoleteUpdates -CleanupObsoleteComputers
```

***

## 8. Vérification côté client

### 8.1 Forcer la vérification immédiate des mises à jour

Sur le client, depuis une **invite de commandes en administrateur** :

```plain text
wuauclt /detectnow
wuauclt /reportnow
```

Ou sur Windows 10/11 :

```plain text
UsoClient StartScan
UsoClient StartDownload
UsoClient StartInstall
```

### 8.2 Vérifier que le client pointe bien vers WSUS

```plain text
# Vérifier les clés de registre WSUS sur le client
reg query "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate"
reg query "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU"
```

Les clés `WUServer` et `WUStatusServer` doivent pointer vers `http://srv-wsus:8530`.

### 8.3 Consulter les journaux Windows Update

```plain text
# Générer un fichier de log lisible
Get-WindowsUpdateLog
```

Le fichier est généré dans `C:\Users\%username%\Desktop\WindowsUpdate.log`.

***

## 9. Résolution des problèmes courants

| Problème                                 | Cause probable                                           | Solution                                                                     |
| ---------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Les clients n'apparaissent pas dans WSUS | GPO non appliquée ou client n'a pas encore contacté WSUS | Forcer `gpupdate /force` + `wuauclt /detectnow` sur le client                |
| Synchronisation WSUS bloquée             | Problème réseau ou certificat expiré                     | Vérifier l'accès Internet du serveur WSUS, relancer le service `WsusService` |
| Espace disque saturé                     | Trop de mises à jour stockées                            | Lancer l'assistant de nettoyage, décliner les mises à jour remplacées        |
| Console WSUS lente ou plante             | Base WID corrompue ou trop grosse                        | Réindexer la base WID (voir ci-dessous)                                      |
| Erreur `0x80244022` sur les clients      | Le serveur WSUS est inaccessible                         | Vérifier le port 8530, le pare-feu et le service IIS sur le serveur          |

### Réindexer la base WID (si console très lente)

```plain text
# Se connecter à la base WID
sqlcmd -S np:\\.\pipe\MICROSOFT##WID\tsql\query -i C:\wsus-reindex.sql
```

Utiliser le script de réindexation officiel Microsoft : [KB920815](https://support.microsoft.com/kb/920815)

***

## 10. Points importants

* **Ne jamais approuver toutes les mises à jour en masse** — toujours tester sur un groupe pilote avant de déployer en production.
* **Les mises à jour de fonctionnalités** (ex. passage à Windows 11) doivent être gérées séparément avec précaution.
* Un serveur WSUS sans nettoyage régulier peut **saturer rapidement** en espace disque.
* Penser à **synchroniser l'heure** de tous les postes (NTP) — Kerberos et WSUS sont tous deux sensibles aux décalages horaires.
* En cas de hiérarchie multi-sites, configurer des serveurs WSUS **downstream** qui synchronisent depuis le serveur central pour économiser la bande passante inter-sites.
