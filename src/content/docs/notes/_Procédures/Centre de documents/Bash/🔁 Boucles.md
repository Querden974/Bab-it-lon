---
title: 🔁 Boucles
editUrl: false
tags:
  - bash
  - scripting
  - linux
  - index
---

**Auteur :** `=this["Créée par"]`  |  **Date :** `=this["Date de création"]`

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
