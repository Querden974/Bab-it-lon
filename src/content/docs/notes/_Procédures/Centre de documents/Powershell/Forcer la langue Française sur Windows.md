---
title: Forcer la langue Française sur Windows
editUrl: false
tags:
  - powershell
  - scripting
  - windows
  - index
---

**Auteur :** `=this["Créée par"]`  |  **Date :** `=this["Date de création"]`

```powershell
Set-WinUILanguageOverride -Language fr-FR
Set-WinUserLanguageList -LanguageList fr-FR -Force
Set-WinSystemLocale fr-FR
Set-Culture fr-FR
Set-WinHomeLocation -GeoId 84

```
