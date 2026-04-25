---
title: Forcer la langue Française sur Windows
editUrl: false
tags:
  - powershell
  - scripting
  - windows
  - index
---

**Auteur :** Gautier RAYEROUX  |  **Date :** 2026-04-15 00:00:00

```powershell
Set-WinUILanguageOverride -Language fr-FR
Set-WinUserLanguageList -LanguageList fr-FR -Force
Set-WinSystemLocale fr-FR
Set-Culture fr-FR
Set-WinHomeLocation -GeoId 84

```
