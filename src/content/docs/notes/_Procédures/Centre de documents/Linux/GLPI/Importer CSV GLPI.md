---
title: Importer CSV GLPI
editUrl: false
---

**Auteur :** \['Gautier RAYEROUX']  |  **Date :** 2025-11-24

***

## Prérequis

Vous devez au préalable avoir installé un serveur GLPI.

Passez sous le profil **super utilisateur** pour avoir tous les privilèges.

### Passer en super utilisateur

1. Entrer la commande suivante :

```plain text
sudo su -
```

![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025.png)
2\. Entrer le mot de passe du compte super utilisateur, puis appuyer sur **Entrée**

***

## 1. Télécharger l'archive « datainjection »

3. Entrer les commandes suivantes pour télécharger et extraire le plugin :

```plain text
cd /var/www/html/glpi/plugins
wget https://github.com/pluginsGLPI/datainjection/releases/download/2.15.1/glpi-datainjection-2.15.1.tar.bz2
tar -xvf glpi-datainjection-2.15.1.tar.bz2
```

***

## 2. Installer le plugin

4. Sur l'interface GLPI, aller dans **« Configuration »** → **« Plugins »**
5. Sur la ligne **« Data Injection »**, activer le plugin

![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025 1.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025-1.png)

***

## 3. Créer un modèle d'injection

6. Dans **« Outils »**, cliquer sur **« Data Injection »**, puis sur l'icône **« Modèle »**
7. Cliquer sur **« Ajouter »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025 2.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025-2.png)
![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025 3.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025-3.png)

8. Remplir les champs, choisir la catégorie de données à injecter, puis cliquer sur **« Ajouter »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025 4.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025-4.png)

9. Sélectionner le fichier CSV à injecter pour préparer le modèle

![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025 5.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025-5.png)

10. Effectuer les correspondances entre les en-têtes CSV et les champs de la catégorie, puis cliquer sur **« Sauvegarder »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025 6.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025-6.png)

11. Aller dans l'onglet **« Validation »**, puis cliquer sur **« Valider le modèle »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025 7.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025-7.png)

***

## 4. Importer le fichier

12. Aller dans **« Outils »** → **« Data Injection »**
13. Sélectionner le modèle d'injection
14. Sélectionner le fichier CSV contenant les données
15. Cliquer sur **« Procéder à l'injection »**

![image/Attachments 3/G\_Rayeroux\_Procedure\_ImporterCSVGlpi\_24112025 8.png](../../../../../../../assets/notes/image/attachments-3/g_rayeroux_procedure_importercsvglpi_24112025-8.png)
