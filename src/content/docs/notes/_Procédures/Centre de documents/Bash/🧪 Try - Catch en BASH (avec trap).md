---
title: 🧪 Try - Catch en BASH (avec trap)
editUrl: false
tags:
  - bash
  - scripting
  - linux
  - index
---

**Auteur :** Gautier RAYEROUX  |  **Date :** 2026-04-15 00:00:00

Bash n’a pas de try/catch natif, on simule :

```bash
trap'echo "Erreur ligne $LINENO"; exit 1' ERRset -e
```

Ou gérer manuellement :

```bash
if !cp file.txt /tmp/;thenecho"Erreur copie"fi
```
