---
title: 🧱 Fonctions
editUrl: false
tags:
  - bash
  - scripting
  - linux
  - index
---

**Auteur :** Gautier RAYEROUX  |  **Date :** 2026-04-15 00:00:00

```bash
my_func() {local name="$1"echo"Hello $name"
}

my_func"John"
```

`local` est CRUCIAL dans les fonctions.

Retourner une valeur :

```bash
return 1# code retourecho"valeur"# sortie
```

Récupérer :

```bash
result=$(my_func)
```
