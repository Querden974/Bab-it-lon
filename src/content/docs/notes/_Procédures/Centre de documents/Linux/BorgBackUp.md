---
title: BorgBackUp
editUrl: false
---

**Auteur :** `=this["Créée par"]`  |  **Date :** `=this["Date de création"]`

Prérequis : avoir une machine sous Debian (ici Debian 12)

# Installation

Dans le terminal

```sh
sudo apt update
sudo apt install borgbackup -y
```

![BorgBackUp](../../../../../../assets/notes/image/attachments/borgbackup.png)

## Vérification de version

![BorgBackUp](../../../../../../assets/notes/image/attachments/borgbackup-1.png)

## Création utilisateur dédié Borg (sécurité)

![BorgBackUp](../../../../../../assets/notes/image/attachments/borgbackup-2.png)

# IP statique

```sh
sudo nano /etc/network/interfaces
```

![BorgBackUp](../../../../../../assets/notes/image/attachments/borgbackup-3.png)
