---
title: Administration Active Directory
editUrl: false
---

**Auteur :** Gautier Rayeroux  |  **Date :** 10/12/2025

***

## 1. Installation du rôle Active Directory

### 1.1 Installer le rôle AD DS

1. Sur le Gestionnaire de serveur, cliquer sur **« Gérer »** → **« Ajouter des rôles et fonctionnalités »**
   ![imported-image-wh.png](../../../../../../assets/notes/image/imported-image-wh.png)
2. Cliquer sur **« Suivant »**
   ![imported-image-Pcw.png](../../../../../../assets/notes/image/imported-image-pcw.png)
3. Sélectionner **« Installation basée sur un rôle ou une fonctionnalité »**
   ![imported-image-gVs.png](../../../../../../assets/notes/image/imported-image-gvs.png)
4. Sélectionner le **serveur de destination**
   ![imported-image-GADt.png](../../../../../../assets/notes/image/imported-image-gadt.png)
5. Dans la liste des rôles, cocher **« Services AD DS »**, puis ajouter les fonctionnalités requises proposées
   ![imported-image-VVPX.png](../../../../../../assets/notes/image/imported-image-vvpx.png)
   ![imported-image-NY.png](../../../../../../assets/notes/image/imported-image-ny.png)
6. Passer les étapes suivantes sans modification si aucune autre fonctionnalité n'est nécessaire
   ![imported-image-IQCA.png](../../../../../../assets/notes/image/imported-image-iqca.png)
7. Prendre connaissance du rôle à installer, puis cliquer sur **« Suivant »**
   ![imported-image-HJK.png](../../../../../../assets/notes/image/imported-image-hjk.png)
8. Lancer l'installation, puis **redémarrer** le serveur
   ![imported-image-wfYv.png](../../../../../../assets/notes/image/imported-image-wfyv.png)

### 1.2 Configuration du contrôleur de domaine

9. Suite à l'installation, une notification apparaît — cliquer sur **« Promouvoir ce serveur en contrôleur de domaine »**
   ![imported-image-IEv.png](../../../../../../assets/notes/image/imported-image-iev.png)
10. Sélectionner **« Ajouter une nouvelle forêt »**, donner un nom de domaine, puis cliquer sur **« Suivant »**
    ![imported-image-Ohn.png](../../../../../../assets/notes/image/imported-image-ohn.png)
11. Entrer un **mot de passe du mode restauration des services d'annuaire (DSRM)**, puis cliquer sur **« Suivant »**
    ![imported-image-nKBP.png](../../../../../../assets/notes/image/imported-image-nkbp.png)
12. Lors de l'étape de délégation DNS, cliquer sur **« Suivant »**
    ![imported-image-qow.png](../../../../../../assets/notes/image/imported-image-qow.png)
13. Patienter que le nom NetBIOS apparaisse, puis cliquer sur **« Suivant »**
    ![imported-image-WnmF.png](../../../../../../assets/notes/image/imported-image-wnmf.png)
14. Définir l'emplacement de la base de données AD DS, des journaux et de SYSVOL, puis cliquer sur **« Suivant »**
    ![imported-image-qNnb.png](../../../../../../assets/notes/image/imported-image-qnnb.png)
15. Vérifier le récapitulatif des sélections, puis cliquer sur **« Suivant »**
    ![imported-image-fiy.png](../../../../../../assets/notes/image/imported-image-fiy.png)
16. Patienter le temps de la vérification. Si elle est satisfaisante, cliquer sur **« Installer »**, puis **redémarrer**
    ![imported-image-wJQ.png](../../../../../../assets/notes/image/imported-image-wjq.png)
17. Après redémarrage, vérifier que le domaine est bien passé de `WORKGROUP` au nom de domaine défini
    ![imported-image-av.png](../../../../../../assets/notes/image/imported-image-av.png)

### 1.3 Spécifier l'adresse DNS du serveur

Une fois le contrôleur de domaine en place, modifier l'adresse DNS du serveur pour qu'il pointe vers **sa propre adresse IPv4**.

![imported-image-pPeu.png](../../../../../../assets/notes/image/imported-image-ppeu.png)

***

## 2. Sauvegarder son Active Directory

### 2.1 Planification de sauvegarde

18. Dans l'onglet **« Outils »**, cliquer sur **« Sauvegarde Windows Server »**
    ![imported-image-r.png](../../../../../../assets/notes/image/imported-image-r.png)
19. Cliquer sur **« Planification de sauvegarde »**
    ![imported-image-AjRk.png](../../../../../../assets/notes/image/imported-image-ajrk.png)
20. Suivre l'assistant de planification :
    ![imported-image-Sn.png](../../../../../../assets/notes/image/imported-image-sn.png)
21. Sélectionner le **type de configuration** de sauvegarde
    ![imported-image-EzS.png](../../../../../../assets/notes/image/imported-image-ezs.png)
22. Spécifier la **fréquence** des sauvegardes
    ![imported-image-hNe.png](../../../../../../assets/notes/image/imported-image-hne.png)
23. Spécifier le **type de destination**
    ![imported-image-mOwZ.png](../../../../../../assets/notes/image/imported-image-mowz.png)
24. Cliquer sur **« Afficher tous les disques disponibles... »**, sélectionner le disque de destination, puis terminer en vérifiant les informations
    ![imported-image-rSb.png](../../../../../../assets/notes/image/imported-image-rsb.png)
    ![imported-image-iMh.png](../../../../../../assets/notes/image/imported-image-imh.png)
    ![imported-image-toth.png](../../../../../../assets/notes/image/imported-image-toth.png)

### 2.2 Sauvegarde unique

25. Cliquer sur **« Sauvegarde unique »**
    ![imported-image-zWW.png](../../../../../../assets/notes/image/imported-image-zww.png)
26. Choisir l'option de sauvegarde à utiliser
    ![imported-image-MTz.png](../../../../../../assets/notes/image/imported-image-mtz.png)
27. Cliquer sur **« Sauvegarder »** pour lancer le processus
    ![imported-image-kCLT.png](../../../../../../assets/notes/image/imported-image-kclt.png)

***

## 3. Activer la corbeille Active Directory

La corbeille AD permet de **restaurer des objets supprimés accidentellement** (comptes utilisateurs, groupes…) sans avoir à restaurer une sauvegarde complète.

28. Sur le Gestionnaire de serveur, aller dans l'onglet **« AD DS »**, faire un clic-droit sur le serveur, puis cliquer sur **« Centre d'administration Active Directory »**
    ![imported-image-N.png](../../../../../../assets/notes/image/imported-image-n.png)
29. Dans le centre d'administration, cliquer sur le **contrôleur de domaine**, puis dans la barre de droite cliquer sur **« Activer la Corbeille... »**
    ![imported-image-gyId.png](../../../../../../assets/notes/image/imported-image-gyid.png)
    ![imported-image-BW.png](../../../../../../assets/notes/image/imported-image-bw.png)
30. Relancer le centre d'administration — le dossier **« Deleted Objects »** est maintenant visible
    ![imported-image-pddt.png](../../../../../../assets/notes/image/imported-image-pddt.png)

***

## 4. Création d'une unité organisationnelle (OU)

### 4.1 Interface graphique

31. Ouvrir **« Utilisateurs et Ordinateurs Active Directory »** depuis l'onglet **« Outils »**
    ![imported-image-q.png](../../../../../../assets/notes/image/imported-image-q.png)
32. Faire un **clic-droit** sur le domaine → **« Nouveau »** → **« Unité d'organisation »**
    ![imported-image-ZZXo.png](../../../../../../assets/notes/image/imported-image-zzxo.png)
33. Donner un **nom** à l'unité d'organisation, puis cliquer sur **« OK »**
    ![imported-image-LDcT.png](../../../../../../assets/notes/image/imported-image-ldct.png)

### 4.2 PowerShell

```plain text
New-ADOrganizationalUnit -Name "Contorse" -Path "dc=virtual-ad;dc=local"
```

***

## 5. Création d'un utilisateur

### 5.1 Interface graphique

34. Faire un **clic-droit** sur le domaine → **« Nouveau »** → **« Utilisateur »**
35. Remplir les différents champs (prénom, nom, identifiant), puis cliquer sur **« Suivant »**
    ![imported-image-Yvk.png](../../../../../../assets/notes/image/imported-image-yvk.png)
    ![imported-image-uQ.png](../../../../../../assets/notes/image/imported-image-uq.png)
36. Définir un **mot de passe**, puis terminer la création

### 5.2 PowerShell

```plain text
New-ADUser -Name 'Gautier RAYEROUX' -GivenName 'Gautier' -Surname 'RAYEROUX' `
  -Enabled $true `
  -Path 'ou=contorse2;dc=virtual-ad;dc=local' `
  -AccountPassword $(ConvertTo-SecureString 'Afpa123*' -AsPlainText -Force) `
  -SamAccountName 'g.rayeroux'
```

***

## 6. Création d'un groupe

### 6.1 Interface graphique

37. Faire un **clic-droit** sur le domaine → **« Nouveau »** → **« Groupe »**
38. Remplir les champs, choisir le type de groupe, puis cliquer sur **« OK »**
    ![imported-image-k\_g.png](../../../../../../assets/notes/image/imported-image-k_g.png)

**Types de groupes :**

* **Groupes de sécurité** — pour attribuer des autorisations à des ressources partagées
* **Groupes de distribution** — pour créer des listes de distribution e-mail

### 6.2 PowerShell

```plain text
New-ADGroup -Name 'Stagiaire' -Path 'ou=contorse2;dc=virtual-ad;dc=local' `
  -GroupScope Global -GroupCategory Security
```

***

## 7. Ajouter un ordinateur au domaine

39. Sur la **machine cliente**, ouvrir les paramètres IP de la carte réseau et définir l'adresse du **Contrôleur de domaine comme DNS**
    ![imported-image-jqK.png](../../../../../../assets/notes/image/imported-image-jqk.png)
40. Vérifier la communication avec un `ping` vers le serveur AD
41. Ouvrir les propriétés système avec la commande `sysdm.cpl`, puis cliquer sur **« Modifier »**
    ![imported-image-PrrM.png](../../../../../../assets/notes/image/imported-image-prrm.png)
42. Sélectionner **« Domaine »**, renseigner le nom de domaine, puis cliquer sur **« OK »**
    ![imported-image-zZb.png](../../../../../../assets/notes/image/imported-image-zzb.png)
43. Renseigner un **compte utilisateur** existant dans l'AD pour authentifier la jonction au domaine

Un message confirme l'entrée dans le domaine.
![imported-image-PjE.png](../../../../../../assets/notes/image/imported-image-pje.png)
![imported-image-OtDm.png](../../../../../../assets/notes/image/imported-image-otdm.png)
44\. **Redémarrer** l'ordinateur, puis se connecter avec les identifiants créés dans l'AD

***

## 8. Installer RSAT

RSAT (Remote Server Administration Tools) permet d'administrer l'AD depuis un poste client Windows.

### 8.1 Installation graphique

45. Aller dans **Paramètres → Système → Fonctionnalités facultatives**, puis cliquer sur **« Ajouter une fonctionnalité »**
    ![imported-image-TFU.png](../../../../../../assets/notes/image/imported-image-tfu.png)
46. Taper **« RSAT »** dans la barre de recherche, sélectionner les outils souhaités, puis cliquer sur **« Ajouter »**
    ![imported-image-jlT.png](../../../../../../assets/notes/image/imported-image-jlt.png)

### 8.2 PowerShell

47. Lancer PowerShell en **mode administrateur**
48. Lister les consoles RSAT disponibles et leur statut :

```plain text
Get-WindowsCapability -Name "RSAT*" -Online | Select-Object -Property DisplayName,State
```

![imported-image-nx.png](../../../../../../assets/notes/image/imported-image-nx.png)
49\. Obtenir le nom technique d'un outil RSAT :

```plain text
Get-WindowsCapability -Name "RSAT*" -Online | Select-Object -Property Name,DisplayName
```

![imported-image-QOh.png](../../../../../../assets/notes/image/imported-image-qoh.png)
50\. Installer un outil RSAT (exemple pour la console Active Directory) :

```plain text
Add-WindowsCapability -Online -Name "Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0"
```

***

## 9. Connecter un lecteur réseau via GPO

51. Ouvrir le **Gestionnaire de stratégie de groupe** depuis l'onglet **« Outils »**
    ![imported-image-Grm.png](../../../../../../assets/notes/image/imported-image-grm.png)
52. Naviguer jusqu'à l'**unité organisationnelle** cible, faire un **clic-droit** → **« Créer un objet GPO dans ce domaine et le lier ici... »**, puis donner un nom à la GPO
    ![imported-image-wCHi.png](../../../../../../assets/notes/image/imported-image-wchi.png)
53. Faire un **clic-droit → « Modifier »** sur la GPO, puis naviguer jusqu'à **Configuration utilisateur → Préférences → Paramètres Windows → Mappages de lecteurs**
    ![imported-image-QL.png](../../../../../../assets/notes/image/imported-image-ql.png)
    ![imported-image-pY.png](../../../../../../assets/notes/image/imported-image-py.png)
54. Faire un **clic-droit → « Nouveau lecteur mappé »**
    ![imported-image-zJ.png](../../../../../../assets/notes/image/imported-image-zj.png)
55. Dans l'onglet **« Général »**, configurer :
    1. L'**emplacement réseau** (chemin UNC)
    2. Cocher **« Reconnecter »**
    3. Définir un **libellé**
    4. Sélectionner la **lettre du lecteur réseau**
       ![imported-image-Cdy.png](../../../../../../assets/notes/image/imported-image-cdy.png)
       ![imported-image-lsTA.png](../../../../../../assets/notes/image/imported-image-lsta.png)
56. Dans l'onglet **« Commun »**, cocher **« Ciblage au niveau de l'élément »**, puis cliquer sur **« Ciblage... »** pour cibler les utilisateurs concernés
57. Cliquer sur **« Nouvel élément »**, choisir le type de ciblage (Groupe de sécurité, OU ou Utilisateur), définir le chemin, puis cliquer sur **« OK »**
    ![imported-image-nF\_s.png](../../../../../../assets/notes/image/imported-image-nf_s.png)
    ![imported-image-bFM.png](../../../../../../assets/notes/image/imported-image-bfm.png)
58. Appliquer les paramètres, cliquer sur **« OK »**, puis faire un **clic-droit → « Appliqué »** sur la GPO
    ![imported-image-oWx.png](../../../../../../assets/notes/image/imported-image-owx.png)
    ![imported-image-mTK.png](../../../../../../assets/notes/image/imported-image-mtk.png)

Le lecteur réseau sera

**monté automatiquement**

à la prochaine connexion des utilisateurs ciblés.

![imported-image-ACcJ.png](../../../../../../assets/notes/image/imported-image-accj.png)
