---
title: GPO - Catalogue Entreprise
editUrl: false
---

**Auteur :** Gautier RAYEROUX  |  **Date :** 2026-04-21 00:00:00

***

> Catalogue de GPO prêtes à l'emploi pour un environnement d'entreprise. Chaque entrée indique le chemin exact dans l'éditeur GPO, le paramètre à modifier et son utilité.
>
> **Convention de nommage suggérée :** `GPO-[Cible]-[Sujet]`
> Exemples : `GPO-Ordi-USB-Bloc`, `GPO-User-Fond-Ecran`, `GPO-Dom-MotDePasse`

***

## Sommaire

* [1. Sécurité des comptes et mots de passe](#1-sécurité-des-comptes-et-mots-de-passe)
* [2. Verrouillage de session](#2-verrouillage-de-session)
* [3. Sécurité des postes de travail](#3-sécurité-des-postes-de-travail)
* [4. Restrictions et droits utilisateurs](#4-restrictions-et-droits-utilisateurs)
* [5. Personnalisation de l'environnement](#5-personnalisation-de-lenvironnement)
* [6. Réseau et lecteurs partagés](#6-réseau-et-lecteurs-partagés)
* [7. Déploiement de logiciels](#7-déploiement-de-logiciels)
* [8. Journaux et audit](#8-journaux-et-audit)
* [9. Windows Update et WSUS](#9-windows-update-et-wsus)
* [10. PowerShell et scripts](#10-powershell-et-scripts)

***

## 1. Sécurité des comptes et mots de passe

> Ces paramètres sont à configurer au niveau du **domaine** (lié à la racine du domaine), car Windows n'applique les stratégies de mot de passe qu'aux comptes locaux depuis les GPO liées aux OU. Pour les comptes AD, seule la GPO du domaine (ou une **Stratégie de mot de passe affinée / PSO**) est prise en compte.

### 1.1 Politique de mot de passe fort

**Nom suggéré :** `GPO-Dom-MotDePasse-Fort`
**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Stratégies de compte → Stratégie de mot de passe`

| Paramètre                                                      | Valeur recommandée | Explication                                                                           |
| -------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------- |
| **Longueur minimale du mot de passe**                          | `12` caractères    | En dessous de 12, les mots de passe sont trop facilement bruteforcés                  |
| **Le mot de passe doit respecter des exigences de complexité** | `Activé`           | Oblige à utiliser majuscules, minuscules, chiffres et caractères spéciaux             |
| **Durée de vie maximale du mot de passe**                      | `90` jours         | Force le renouvellement régulier                                                      |
| **Durée de vie minimale du mot de passe**                      | `1` jour           | Empêche l'utilisateur de changer immédiatement pour revenir à son ancien mot de passe |
| **Conserver l'historique des mots de passe**                   | `10` mots de passe | Interdit la réutilisation des 10 derniers mots de passe                               |
| **Stocker les mots de passe avec un chiffrement réversible**   | `Désactivé`        | Ne jamais activer sauf besoin applicatif spécifique (risque de sécurité)              |

> **Ce que la complexité impose :** le mot de passe doit contenir des caractères d'au moins 3 des 4 catégories suivantes : majuscules (A–Z), minuscules (a–z), chiffres (0–9), caractères spéciaux (!@#\$…). Il ne doit pas contenir le nom de compte ou le nom complet de l'utilisateur.

```plain text
# Vérifier la politique de mot de passe appliquée sur le domaine
Get-ADDefaultDomainPasswordPolicy
```

***

### 1.2 Stratégie de verrouillage de compte

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Stratégies de compte → Stratégie de verrouillage du compte`

| Paramètre                           | Valeur recommandée | Explication                                                                   |
| ----------------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| **Seuil de verrouillage du compte** | `5` tentatives     | Bloque le compte après 5 échecs consécutifs (protection contre le bruteforce) |
| **Durée de verrouillage du compte** | `15` minutes       | Déverrouillage automatique après 15 min — évite la surcharge du support       |
| **Réinitialiser le compteur après** | `15` minutes       | Remet le compteur à zéro après 15 min sans échec                              |

> Mettre `0` dans **Durée de verrouillage** signifie que seul un administrateur peut déverrouiller manuellement.

***

### 1.3 Stratégie Kerberos

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Stratégies de compte → Stratégie Kerberos`

| Paramètre                                                   | Valeur recommandée | Explication                                                                                                        |
| ----------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Durée de vie maximale du ticket de service**              | `600` minutes      | Durée de validité d'un ticket Kerberos pour un service                                                             |
| **Durée de vie maximale du ticket utilisateur**             | `10` heures        | Un utilisateur doit se ré-authentifier toutes les 10h                                                              |
| **Tolérance maximale pour la synchronisation des horloges** | `5` minutes        | Les machines dont l'heure diffère de plus de 5 min sont rejetées par Kerberos — d'où l'importance d'un serveur NTP |

***

## 2. Verrouillage de session

### 2.1 Activer l'économiseur d'écran avec mot de passe

**Nom suggéré :** `GPO-User-Ecran-Verrouillage`
**Chemin :** `Configuration utilisateur → Modèles d'administration → Panneau de configuration → Personnalisation`

| Paramètre                                          | Valeur                                 |
| -------------------------------------------------- | -------------------------------------- |
| **Activer l'écran de veille**                      | `Activé`                               |
| **Protéger l'écran de veille par un mot de passe** | `Activé`                               |
| **Délai d'activation de l'économiseur d'écran**    | `Activé` → `600` secondes (10 min)     |
| **Forcer un écran de veille spécifique**           | `Activé` → `scrnsave.scr` (écran noir) |

***

### 2.2 Verrouillage interactif automatique

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Options de sécurité`

| Paramètre                                                                  | Valeur         |
| -------------------------------------------------------------------------- | -------------- |
| **Ouverture de session interactive : limite d'inactivité de l'ordinateur** | `600` secondes |

> Ce paramètre verrouille directement la session Windows (sans passer par l'économiseur d'écran).

***

### 2.3 Message d'avertissement à la connexion

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Options de sécurité`

| Paramètre                                               | Valeur                                                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Ouverture de session interactive : titre du message** | `Accès réservé au personnel autorisé`                                                      |
| **Ouverture de session interactive : texte du message** | `Toute connexion non autorisée est passible de poursuites. Vos actions sont enregistrées.` |

***

## 3. Sécurité des postes de travail

### 3.1 Bloquer les périphériques USB

**Nom suggéré :** `GPO-Ordi-USB-Bloc`
**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Système → Accès au stockage amovible`

| Paramètre                                                        | Valeur                         |
| ---------------------------------------------------------------- | ------------------------------ |
| **Disques amovibles : refuser l'accès en lecture**               | `Activé`                       |
| **Disques amovibles : refuser l'accès en écriture**              | `Activé`                       |
| **CD et DVD : refuser l'accès en écriture**                      | `Activé`                       |
| **Toutes les classes de stockage amovible : refuser tout accès** | `Activé` (option plus globale) |

> Pour autoriser les USB à certains utilisateurs uniquement, utiliser le **filtrage de sécurité** pour exclure le groupe concerné de cette GPO.

***

### 3.2 Désactiver l'exécution automatique (AutoRun / AutoPlay)

**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Stratégies d'exécution automatique`

| Paramètre                                                              | Valeur                                           |
| ---------------------------------------------------------------------- | ------------------------------------------------ |
| **Désactiver l'exécution automatique**                                 | `Activé` → `Tous les lecteurs`                   |
| **Empêcher l'exécution automatique pour les périphériques non-volume** | `Activé`                                         |
| **Définir le comportement par défaut pour l'exécution automatique**    | `Activé` → `Ne pas exécuter de commande AutoRun` |

***

### 3.3 Activer le pare-feu Windows

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Pare-feu Windows avec sécurité avancée`

| Paramètre                             | Valeur                 |
| ------------------------------------- | ---------------------- |
| **Profil Domaine — État du pare-feu** | `Activé`               |
| **Profil Privé — État du pare-feu**   | `Activé`               |
| **Profil Public — État du pare-feu**  | `Activé`               |
| **Connexions entrantes**              | `Bloquer (par défaut)` |

***

### 3.4 Désactiver le Gestionnaire des tâches

**Chemin :** `Configuration utilisateur → Modèles d'administration → Système → Options Ctrl+Alt+Suppr`

| Paramètre                                | Valeur   |
| ---------------------------------------- | -------- |
| **Supprimer le Gestionnaire des tâches** | `Activé` |

***

### 3.5 Empêcher l'installation de logiciels par les utilisateurs

**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Windows Installer`

| Paramètre                                     | Valeur                                                           |
| --------------------------------------------- | ---------------------------------------------------------------- |
| **Désactiver Windows Installer**              | `Activé` → `Pour les applications non gérées`                    |
| **Toujours installer avec des droits élevés** | `Désactivé` (ne jamais activer — risque de privilege escalation) |

***

### 3.6 Désactiver le Bureau à distance (RDP)

**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Services Bureau à distance → Hôte de session Bureau à distance → Connexions`

| Paramètre                                                                                    | Valeur      |
| -------------------------------------------------------------------------------------------- | ----------- |
| **Permettre aux utilisateurs de se connecter à distance via les Services Bureau à distance** | `Désactivé` |

> Appliquer cette GPO aux OU contenant les postes utilisateurs, pas aux serveurs.

***

### 3.7 Désactiver le registre Windows pour les utilisateurs

**Chemin :** `Configuration utilisateur → Modèles d'administration → Système`

| Paramètre                                                   | Valeur   |
| ----------------------------------------------------------- | -------- |
| **Empêcher l'accès aux outils de modification du Registre** | `Activé` |

***

## 4. Restrictions et droits utilisateurs

### 4.1 Restreindre l'accès au Panneau de configuration

**Nom suggéré :** `GPO-User-PanneauConfig-Bloc`
**Chemin :** `Configuration utilisateur → Modèles d'administration → Panneau de configuration`

| Paramètre                                                                 | Valeur   |
| ------------------------------------------------------------------------- | -------- |
| **Interdire l'accès au Panneau de configuration et aux paramètres du PC** | `Activé` |

***

### 4.2 Empêcher l'accès à l'invite de commandes

**Chemin :** `Configuration utilisateur → Modèles d'administration → Système`

| Paramètre                                                       | Valeur                                                          |
| --------------------------------------------------------------- | --------------------------------------------------------------- |
| **Empêcher l'accès à l'invite de commandes**                    | `Activé`                                                        |
| **Désactiver également le traitement des scripts de commandes** | `Non` (mettre `Oui` bloque aussi les scripts .bat au démarrage) |

***

### 4.3 Restreindre l'accès à des applications spécifiques

**Chemin :** `Configuration utilisateur → Modèles d'administration → Système`

| Paramètre                                              | Valeur                                      |
| ------------------------------------------------------ | ------------------------------------------- |
| **N'exécuter que les applications Windows spécifiées** | `Activé` → liste blanche des .exe autorisés |

ou à l'inverse :

| Paramètre                                               | Valeur                                                 |
| ------------------------------------------------------- | ------------------------------------------------------ |
| **Ne pas exécuter les applications Windows spécifiées** | `Activé` → `regedit.exe`, `cmd.exe`, `powershell.exe`… |

***

### 4.4 Droits d'ouverture de session locale

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Stratégies locales → Attribution des droits utilisateur`

| Paramètre                                      | Valeur recommandée                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Permettre l'ouverture d'une session locale** | Restreindre aux groupes autorisés (ex. `Utilisateurs du domaine`, `Admins du domaine`)                 |
| **Refuser l'ouverture de session locale**      | Ajouter les comptes de service ou comptes sensibles qui ne doivent jamais se connecter interactivement |
| **Arrêter le système**                         | Restreindre aux administrateurs                                                                        |

***

### 4.5 Contrôle de compte d'utilisateur (UAC)

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Options de sécurité`

| Paramètre                                                                                                     | Valeur recommandée                           |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Contrôle de compte d'utilisateur : comportement de l'invite d'élévation pour les administrateurs**          | `Demander les informations d'identification` |
| **Contrôle de compte d'utilisateur : comportement de l'invite d'élévation pour les utilisateurs standard**    | `Demander les informations d'identification` |
| **Contrôle de compte d'utilisateur : détecter les installations d'applications et demander l'élévation**      | `Activé`                                     |
| **Contrôle de compte d'utilisateur : exécuter tous les administrateurs en mode d'approbation administrateur** | `Activé`                                     |

***

## 5. Personnalisation de l'environnement

### 5.1 Fond d'écran commun

**Nom suggéré :** `GPO-User-Fond-Ecran`
**Chemin :** `Configuration utilisateur → Modèles d'administration → Bureau → Bureau`

| Paramètre                                    | Valeur                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------- |
| **Papier peint du Bureau**                   | `Activé` → chemin UNC (ex. `\\srv-ad\Partages\fond.jpg`) + style `Remplir` |
| **Empêcher la modification du papier peint** | `Activé` (empêche l'utilisateur de le changer)                             |

***

### 5.2 Désactiver les notifications de bureau

**Chemin :** `Configuration utilisateur → Modèles d'administration → Menu Démarrer et barre des tâches → Notifications`

| Paramètre                                                          | Valeur   |
| ------------------------------------------------------------------ | -------- |
| **Désactiver les notifications toast**                             | `Activé` |
| **Désactiver les notifications toast sur l'écran de verrouillage** | `Activé` |

***

### 5.3 Configurer la page d'accueil Internet Explorer / Edge

**Chemin (Edge) :** `Configuration utilisateur → Modèles d'administration → Microsoft Edge`

| Paramètre                            | Valeur                                                         |
| ------------------------------------ | -------------------------------------------------------------- |
| **Configurer la page d'accueil**     | `Activé` → URL de l'intranet (ex. `http://intranet.lab.local`) |
| **Configurer la page Nouvel onglet** | `Activé` → même URL                                            |

> Nécessite le téléchargement des **modèles d'administration Edge (ADMX)** depuis le site Microsoft et leur copie dans `C:\Windows\PolicyDefinitions\`.

***

### 5.4 Rediriger le dossier Documents

**Nom suggéré :** `GPO-User-Redirection-Documents`
**Chemin :** `Configuration utilisateur → Stratégies → Paramètres Windows → Redirection de dossiers → Documents`

| Paramètre                                                          | Valeur                                                                     |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| **Paramètre**                                                      | `De base - Rediriger le dossier de tout le monde vers le même emplacement` |
| **Chemin racine**                                                  | `\\srv-ad\Profils\%username%\Documents`                                    |
| **Créer un dossier pour chaque utilisateur sous le chemin racine** | `Oui`                                                                      |

> Faire la même chose pour `Bureau`, `Images`, `Téléchargements` si nécessaire.

***

## 6. Réseau et lecteurs partagés

### 6.1 Mapper des lecteurs réseau

**Nom suggéré :** `GPO-User-Lecteur-Commun`
**Chemin :** `Configuration utilisateur → Préférences → Paramètres Windows → Mappages de lecteurs`

| Paramètre       | Valeur            |
| --------------- | ----------------- |
| **Action**      | `Créer`           |
| **Emplacement** | `\\srv-ad\Commun` |
| **Lettre**      | `Z:`              |
| **Reconnecter** | `Oui`             |

> Utiliser le **ciblage au niveau de l'élément** (onglet Commun) pour limiter le lecteur à un groupe de sécurité précis.

***

### 6.2 Désactiver le partage de fichiers et imprimantes

**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Réseau → Connexions réseau → Pare-feu Windows`

| Paramètre                                                                                           | Valeur      |
| --------------------------------------------------------------------------------------------------- | ----------- |
| **Profil standard : autoriser les exceptions pour le partage de fichiers et d'imprimantes entrant** | `Désactivé` |

***

### 6.3 Configurer un proxy réseau

**Chemin :** `Configuration utilisateur → Préférences → Paramètres Windows → Registre`

Ajouter les valeurs de registre suivantes dans `HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings` :

| Valeur          | Type   | Données                |
| --------------- | ------ | ---------------------- |
| `ProxyEnable`   | DWORD  | `1`                    |
| `ProxyServer`   | String | `proxy.lab.local:3128` |
| `ProxyOverride` | String | `*.lab.local;<local>`  |

***

### 6.4 Désactiver IPv6

**Chemin :** `Configuration de l'ordinateur → Préférences → Paramètres Windows → Registre`

| Clé         | `HKLM\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters` |
| ----------- | ---------------------------------------------------------- |
| **Valeur**  | `DisabledComponents`                                       |
| **Type**    | DWORD                                                      |
| **Données** | `0xFF` (désactive complètement IPv6)                       |

***

## 7. Déploiement de logiciels

### 7.1 Déployer un MSI via GPO

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres logiciels → Installation de logiciels`
ou
`Configuration utilisateur → Stratégies → Paramètres logiciels → Installation de logiciels`

1. Placer le fichier `.msi` sur un **partage réseau accessible** (ex. `\\srv-ad\Deploiement\NomLogiciel.msi`)
2. Clic-droit → **« Nouveau »** → **« Package »**
3. Renseigner le chemin UNC du fichier `.msi`
4. Choisir la méthode :
   * **Affecté** (Ordinateur) : installé automatiquement au démarrage, non désinstallable par l'utilisateur
   * **Publié** (Utilisateur) : disponible dans **Ajout/Suppression de programmes**, l'utilisateur choisit d'installer

> Le déploiement via **Configuration de l'ordinateur** est plus fiable — il s'applique avant l'ouverture de session.

***

## 8. Journaux et audit

### 8.1 Activer les journaux d'audit de sécurité

**Nom suggéré :** `GPO-Ordi-Audit-Securite`
**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Stratégies d'audit locales → Stratégie d'audit`

| Paramètre                                  | Succès | Échec                |
| ------------------------------------------ | ------ | -------------------- |
| **Auditer les événements de connexion**    | `Oui`  | `Oui`                |
| **Auditer la gestion des comptes**         | `Oui`  | `Oui`                |
| **Auditer les accès aux objets**           | `Oui`  | `Oui`                |
| **Auditer les modifications de stratégie** | `Oui`  | `Oui`                |
| **Auditer l'utilisation des privilèges**   | `Non`  | `Oui`                |
| **Auditer les événements système**         | `Oui`  | `Oui`                |
| **Auditer le suivi des processus**         | `Non`  | `Non` (très verbeux) |

***

### 8.2 Configurer la taille et la rétention des journaux d'événements

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Journal des événements`

| Journal         | Taille max           | Méthode de rétention      |
| --------------- | -------------------- | ------------------------- |
| **Application** | `32768` Ko           | `Remplacer si nécessaire` |
| **Sécurité**    | `196608` Ko (192 Mo) | `Remplacer si nécessaire` |
| **Système**     | `32768` Ko           | `Remplacer si nécessaire` |

***

## 9. Windows Update et WSUS

### 9.1 Pointer vers un serveur WSUS interne

**Nom suggéré :** `GPO-Ordi-WSUS`
**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Windows Update`

| Paramètre                                                                | Valeur                                                               |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Spécifier l'emplacement intranet du service de mise à jour Microsoft** | `Activé` → `http://srv-wsus:8530` (les deux champs)                  |
| **Configurer les mises à jour automatiques**                             | `Activé` → `4 - Téléchargement auto, notification pour installation` |
| **Planifier le redémarrage automatique lors des mises à jour**           | `Activé`                                                             |
| **Délai de redémarrage automatique**                                     | `15` minutes                                                         |
| **Ne pas redémarrer automatiquement avec des utilisateurs connectés**    | `Activé` (ne redémarre pas si quelqu'un est connecté)                |

***

### 9.2 Désactiver Windows Update automatique (postes gérés manuellement)

**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Windows Update`

| Paramètre                                    | Valeur                                                             |
| -------------------------------------------- | ------------------------------------------------------------------ |
| **Configurer les mises à jour automatiques** | `Activé` → `2 - Notifier pour le téléchargement et l'installation` |

***

## 10. PowerShell et scripts

### 10.1 Autoriser l'exécution des scripts PowerShell

**Chemin :** `Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Windows PowerShell`

| Paramètre                           | Valeur                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------ |
| **Activer l'exécution des scripts** | `Activé` → `Autoriser les scripts locaux et les scripts signés distants` |

***

### 10.2 Script de démarrage (ordinateur)

**Chemin :** `Configuration de l'ordinateur → Stratégies → Paramètres Windows → Scripts → Démarrage`

1. Double-cliquer sur **« Démarrage »** → **« Ajouter »**
2. Cliquer sur **« Parcourir »** et sélectionner le script (`.ps1`, `.bat`, `.cmd`) depuis le partage SYSVOL ou un partage réseau
3. Ajouter les paramètres éventuels, puis cliquer sur **« OK »**

***

### 10.3 Script de fermeture de session (utilisateur)

**Chemin :** `Configuration utilisateur → Stratégies → Paramètres Windows → Scripts → Fermeture de session`

> Utile pour vider des dossiers temporaires, déconnecter des lecteurs, enregistrer des logs…

***

## Récapitulatif — GPO par priorité de déploiement

| Priorité      | GPO                                     | Cible        |
| ------------- | --------------------------------------- | ------------ |
| 🔴 Critique   | Mot de passe fort + verrouillage compte | Domaine      |
| 🔴 Critique   | Audit de sécurité                       | Ordinateurs  |
| 🔴 Critique   | Pare-feu Windows activé                 | Ordinateurs  |
| 🟠 Important  | Blocage USB                             | Ordinateurs  |
| 🟠 Important  | Désactivation AutoRun                   | Ordinateurs  |
| 🟠 Important  | UAC renforcé                            | Ordinateurs  |
| 🟠 Important  | Verrouillage de session (10 min)        | Utilisateurs |
| 🟡 Recommandé | Message d'avertissement connexion       | Ordinateurs  |
| 🟡 Recommandé | WSUS / Windows Update                   | Ordinateurs  |
| 🟡 Recommandé | Redirection Documents                   | Utilisateurs |
| 🟡 Recommandé | Lecteurs réseau mappés                  | Utilisateurs |
| 🟢 Confort    | Fond d'écran commun                     | Utilisateurs |
| 🟢 Confort    | Page d'accueil navigateur               | Utilisateurs |
