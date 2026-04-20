---
title: Logs
editUrl: false
---

## 1. Consulter les logs

Aller dans **Status** → **System Logs** pour analyser le trafic de pfSense.

![image/Attachments 3/Installation\_CISCO\_CSB250\_08012025(1) 42.png](../../../../../../assets/notes/image/attachments-3/installation_cisco_csb250_080120251-42.png)

***

## 2. Télécharger les logs

### 2.1 Télécharger un fichier log spécifique

1. Aller dans **Diagnostics** → **Command Prompt**
2. Définir l'emplacement du fichier log à télécharger

![image/Attachments 3/Installation\_CISCO\_CSB250\_08012025(1) 43.png](../../../../../../assets/notes/image/attachments-3/installation_cisco_csb250_080120251-43.png)

### 2.2 Télécharger tous les logs

1. Passer en mode shell sur pfSense
2. Créer une archive du dossier log :

```plain text
zip -r archive-log.zip /var/log
```

3. Télécharger l'archive depuis **Diagnostics** → **Command Prompt**

![image/Attachments 3/Installation\_CISCO\_CSB250\_08012025(1) 44.png](../../../../../../assets/notes/image/attachments-3/installation_cisco_csb250_080120251-44.png)
