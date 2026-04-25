---
title: 🔁 Boucles
editUrl: false
tags:
  - bash
  - scripting
  - linux
  - index
---

**Auteur :** Gautier RAYEROUX  |  **Date :** 2026-04-15 00:00:00

## for

```bash
for iin 1 2 3;doecho"$i"done
```

```bash
for filein *.txt;doecho"$file"done
```

## while

```bash
whileread -r line;doecho"$line"done < file.txt
```

## until

```bash
until ping -c1 google.com;dosleep 1done
```
