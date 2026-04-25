---
title: GPO Windows Server
editUrl: false
---

**Auteur :** `=this["Créée par"]`  |  **Date :** `=this["Date de création"]`

***

> Les **GPO (Group Policy Objects)** sont des objets de stratégie de groupe permettant d'appliquer automatiquement des paramètres de configuration à des utilisateurs ou des ordinateurs d'un domaine Active Directory. Elles évitent toute configuration manuelle poste par poste.

***

## 1. Concepts clés des GPO

| Terme                         | Description                                                          |
| ----------------------------- | -------------------------------------------------------------------- |
| **GPO**                       | Objet contenant des paramètres de configuration à appliquer          |
| **GPMC**                      | Console de gestion des stratégies de groupe                          |
| **OU (Unité d'Organisation)** | Conteneur AD auquel on lie une GPO                                   |
| **Lien GPO**                  | Association entre une GPO et un conteneur AD (site, domaine, OU)     |
| **Héritage**                  | Les GPO se propagent des conteneurs parents vers les enfants         |
| **Blocage d'héritage**        | Empêche une OU enfant de recevoir les GPO parentes                   |
| **Forcer (Enforced)**         | Empêche une GPO parente d'être écrasée par une GPO enfant            |
| **Filtrage de sécurité**      | Limite l'application d'une GPO à certains groupes ou utilisateurs    |
| **WMI Filter**                | Condition supplémentaire basée sur des propriétés système (OS, RAM…) |

### Ordre d'application des GPO (LSDOU)

Les GPO s'appliquent dans cet ordre — la dernière appliquée l'emporte :

1. **L**ocal — stratégies locales de la machine
2. **S**ite — GPO liées au site AD
3. **D**omaine — GPO liées à la racine du domaine
4. **O**U — GPO liées à l'unité d'organisation (de la plus haute à la plus basse)

> Les **paramètres Ordinateur** s'appliquent au démarrage, les **paramètres Utilisateur** à l'ouverture de session.

***

## 2. Ouvrir la console GPMC

1. Dans le **Gestionnaire de serveur**, aller dans **Outils → Gestion des stratégies de groupe**

Ou via PowerShell :

```plain text
gpmc.msc
```

***

## 3. Créer et lier une GPO

### 3.1 Créer une GPO

2. Dans la GPMC, faire un **clic-droit** sur **« Objets de stratégie de groupe »** → **« Nouveau »**
3. Renseigner un **nom explicite** (ex. `GPO-Fond-Ecran`, `GPO-Restriction-USB`), puis cliquer sur **« OK »**

> La GPO est créée mais n'est pas encore liée — elle n'a aucun effet pour l'instant.

```plain text
New-GPO -Name "GPO-Fond-Ecran"
```

### 3.2 Lier une GPO à une OU

4. Naviguer jusqu'à l'**OU cible** dans l'arborescence
5. Faire un **clic-droit** sur l'OU → **« Lier un objet de stratégie de groupe existant... »**
6. Sélectionner la GPO dans la liste, puis cliquer sur **« OK »**

```plain text
New-GPLink -Name "GPO-Fond-Ecran" -Target "OU=Stagiaires,DC=lab,DC=local"
```

### 3.3 Créer et lier en une seule étape

7. Faire un **clic-droit** directement sur l'OU → **« Créer un objet GPO dans ce domaine et le lier ici... »**
8. Donner un nom à la GPO, puis cliquer sur **« OK »**

***

## 4. Modifier une GPO

9. Dans la GPMC, faire un **clic-droit** sur la GPO → **« Modifier »**
10. L'éditeur de gestion des stratégies de groupe s'ouvre avec deux grandes sections :

```
📁 Configuration de l'ordinateur   → s'applique à la machine (démarrage)
   └── Stratégies
       ├── Paramètres Windows
       └── Modèles d'administration
📁 Configuration utilisateur        → s'applique à l'utilisateur (ouverture de session)
   └── Stratégies
       ├── Paramètres Windows
       └── Modèles d'administration
```

***

## 5. Exemples de GPO courantes

### 5.1 Définir un fond d'écran commun

> **Chemin :** Configuration utilisateur → Modèles d'administration → Bureau → Bureau

11. Ouvrir le paramètre **« Papier peint du Bureau »**
12. Sélectionner **« Activé »**
13. Renseigner le **chemin UNC** vers l'image (ex. `\\srv-ad\Partages\fond.jpg`)
14. Choisir le style d'affichage (**Remplir**, **Étirer**, **Centré**…)
15. Cliquer sur **« OK »**

***

### 5.2 Bloquer l'accès aux périphériques USB

> **Chemin :** Configuration de l'ordinateur → Modèles d'administration → Système → Accès au stockage amovible

16. Activer **« Disques amovibles : refuser l'accès en lecture »**
17. Activer **« Disques amovibles : refuser l'accès en écriture »**

***

### 5.3 Rediriger le dossier Documents vers un partage réseau

> **Chemin :** Configuration utilisateur → Stratégies → Paramètres Windows → Redirection de dossiers → Documents

18. Clic-droit sur **« Documents »** → **« Propriétés »**
19. Dans **« Paramètre »**, choisir **« De base - Rediriger le dossier de tout le monde vers le même emplacement »**
20. Renseigner le **chemin racine** (ex. `\\srv-ad\Profils\%username%\Documents`)
21. Cliquer sur **« OK »**

***

### 5.4 Mapper un lecteur réseau

> **Chemin :** Configuration utilisateur → Préférences → Paramètres Windows → Mappages de lecteurs

22. Clic-droit → **« Nouveau »** → **« Lecteur mappé »**
23. Configurer :
    * **Action** : `Créer`
    * **Emplacement** : chemin UNC du partage (ex. `\\srv-ad\Commun`)
    * **Lettre du lecteur** : ex. `Z:`
    * Cocher **« Reconnecter »**
24. Dans l'onglet **« Commun »**, activer **« Ciblage au niveau de l'élément »** pour restreindre à un groupe ou une OU

***

### 5.5 Configurer Windows Update (WSUS)

> **Chemin :** Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Windows Update

25. Activer **« Spécifier l'emplacement intranet du service de mise à jour Microsoft »**
26. Renseigner l'URL du serveur WSUS (ex. `http://srv-wsus:8530`) dans les deux champs
27. Activer **« Configurer les mises à jour automatiques »** et choisir la planification

***

### 5.6 Déployer un script de démarrage

> **Chemin :** Configuration de l'ordinateur → Stratégies → Paramètres Windows → Scripts → Démarrage

28. Double-cliquer sur **« Démarrage »** → **« Ajouter »**
29. Cliquer sur **« Parcourir »** pour sélectionner le script (`.bat`, `.ps1`, `.cmd`)
30. Renseigner les éventuels **paramètres**, puis cliquer sur **« OK »**

> Pour les scripts PowerShell, s'assurer que la politique d'exécution le permet (voir section 7).

***

### 5.7 Restreindre l'accès au Panneau de configuration

> **Chemin :** Configuration utilisateur → Modèles d'administration → Panneau de configuration

31. Activer **« Interdire l'accès au Panneau de configuration et aux paramètres du PC »**

***

## 6. Filtrage de sécurité

Par défaut, une GPO s'applique à tous les **Utilisateurs authentifiés** liés au conteneur. Le filtrage permet de cibler un groupe précis.

32. Dans la GPMC, cliquer sur la GPO (sans l'éditer)
33. Dans l'onglet **« Portée »**, section **« Filtrage de sécurité »** :
    * Supprimer **« Utilisateurs authentifiés »** si on veut restreindre à un groupe spécifique
    * Cliquer sur **« Ajouter »** pour choisir le groupe ou l'utilisateur cible

> Attention : si **« Utilisateurs authentifiés »** est retiré, il faut aussi s'assurer que le groupe cible a au minimum les droits de **lecture** sur la GPO.

***

## 7. Autoriser les scripts PowerShell via GPO

Par défaut, Windows bloque l'exécution des scripts PowerShell. Cette GPO lève cette restriction.

> **Chemin :** Configuration de l'ordinateur → Modèles d'administration → Composants Windows → Windows PowerShell

34. Activer **« Activer l'exécution des scripts »**
35. Choisir la **stratégie d'exécution** :
    * `Autoriser tous les scripts` — aucune restriction
    * `Autoriser les scripts locaux et les scripts signés distants` — recommandé
    * `Autoriser uniquement les scripts signés` — le plus strict

***

## 8. Forcer l'application d'une GPO

Par défaut, l'héritage peut être bloqué par une OU enfant. Pour s'assurer qu'une GPO s'applique toujours :

36. Dans la GPMC, faire un **clic-droit** sur le **lien de la GPO** (dans l'OU ou le domaine) → **« Appliqué »**

> Le lien passe à l'état **Appliqué** (icône avec cadenas) — la GPO ne peut plus être remplacée par une GPO de niveau inférieur.

***

## 9. Bloquer l'héritage sur une OU

Pour qu'une OU n'hérite pas des GPO des conteneurs parents :

37. Clic-droit sur l'OU → **« Bloquer l'héritage »**

> À utiliser avec précaution — cela inclut les GPO de sécurité essentielles définies au niveau du domaine.

***

## 10. Forcer la mise à jour des GPO

### 10.1 Sur le client (immédiat)

```plain text
gpupdate /force
```

### 10.2 Depuis le serveur, sur tous les postes d'une OU

38. Dans la GPMC, clic-droit sur l'OU → **« Mise à jour de la stratégie de groupe... »**
39. Sélectionner les ordinateurs, puis cliquer sur **« Oui »**

```plain text
Invoke-GPUpdate -Computer "PC-Bureau01" -Force
```

### 10.3 Vérifier les GPO appliquées sur un poste

```plain text
gpresult /r
gpresult /h C:\rapport-gpo.html
```

***

## 11. Points importants

* Nommer les GPO de façon **claire et descriptive** pour faciliter la maintenance (ex. `GPO-USB-Bloc-Ordi`, `GPO-Fond-Ecran-Commercial`).
* Éviter de lier des GPO directement à la **racine du domaine** sauf pour des paramètres globaux (sécurité de base, mots de passe).
* Tester les GPO sur une **OU de test** avant de les déployer en production.
* Utiliser l'outil **RSOP (Résultant de stratégies)** ou `gpresult` pour diagnostiquer les conflits entre GPO.
* Les modifications de GPO sont répliquées entre contrôleurs de domaine via **SYSVOL** — prévoir un délai de réplication.
