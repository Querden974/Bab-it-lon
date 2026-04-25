---
title: index
editUrl: false
tags:
  - bash
  - scripting
  - linux
  - index
---

**Auteur :** Gautier RAYEROUX  |  **Date :** 2026-04-15 00:00:00

# Bash — Centre de Ressources

:::tip[Présentation]
**Bash** (Bourne Again SHell) est le shell par défaut sur la plupart des distributions Linux. Il permet d'automatiser des tâches système via des scripts, en combinant commandes, variables, structures de contrôle et redirections. Tout script robuste commence par :

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

`set -e` arrête le script en cas d'erreur · `set -u` interdit les variables non définies · `set -o pipefail` propage les erreurs dans les pipes

:::

***

## Fondamentaux

:::tip[Bases]


### [📦 Basics](/notes/_procédures/centre-de-documents/bash/-basics)

Variables, tableaux et manipulation de chaînes.

* Déclaration : `name="val"` (pas d'espace autour de `=`)
* Toujours citer : `"$var"` ou `"${var}"`
* `readonly PI=3.14` — constante
* Manipulation de chaînes : `${name%.txt}`, `${#name}`
* Tableaux : `arr=("a" "b")` → `${arr[@]}`

:::

:::tip[Conditions]


### [🔀 Conditions](/notes/_procédures/centre-de-documents/bash/-conditions)

Tests et branchements conditionnels.

* `if [[ ... ]]; then ... elif ... else ... fi`
* Toujours utiliser `[[ ]]` plutôt que `[ ]`
* Comparaisons chaînes : `=`
* Comparaisons entiers : `-eq`, `-ne`, `-lt`, `-le`, `-gt`, `-ge`
* Logique : `&&`, `||`, `!`

:::

:::tip[Boucles]


### [🔁 Boucles](/notes/_procédures/centre-de-documents/bash/-boucles)

Itérer sur des valeurs, des fichiers ou des flux.

```bash
for i in 1 2 3; do ... done
for file in *.txt; do ... done
while read -r line; do ... done < file.txt
until ping -c1 host; do sleep 1; done
```

:::

***

## Structures de contrôle

:::note[Case (switch)]


### [🧩 Case (switch)](/notes/_procédures/centre-de-documents/bash/-case-switch)

Remplacer les chaînes de `if/elif` par un `case` lisible.

```bash
case "$1" in
  start) echo "Start" ;;
  stop)  echo "Stop"  ;;
  *)     echo "Usage: start|stop" ;;
esac
```

:::

:::note[Fonctions]


### [🧱 Fonctions](/notes/_procédures/centre-de-documents/bash/-fonctions)

Découper un script en blocs réutilisables.

```bash
my_func() {
  local name="$1"   # local est CRUCIAL
  echo "Hello $name"
}
result=$(my_func "John")
```

* `local` pour éviter la pollution de l'espace global
* `return` pour un code de retour (0–255)
* `echo` + `$()` pour retourner une valeur string

:::

***

## Techniques avancées

:::caution[Gestion d'erreurs — trap]


### [🧪 Try - Catch en BASH (avec trap)](/notes/_procédures/centre-de-documents/bash/-try---catch-en-bash-avec-trap)

Bash n'a pas de `try/catch` natif — on simule avec `trap`.

```bash
trap 'echo "Erreur ligne $LINENO"; exit 1' ERR
set -e
```

Ou gestion manuelle :

```bash
if ! cp file.txt /tmp/; then
  echo "Erreur copie"
fi
```

:::

:::caution[Substitution de commande]


### [🧵 Substitution de commande](/notes/_procédures/centre-de-documents/bash/-substitution-de-commande)

Capturer la sortie d'une commande dans une variable.

```bash
files=$(ls)
today=$(date)
count=$(wc -l < fichier.txt)
```

Toujours préférer `$(...)` à l'ancienne syntaxe avec backticks.

:::

***

## Rappels essentiels

### Variables spéciales

| Variable    | Signification                       |
| ----------- | ----------------------------------- |
| `$0`        | Nom du script                       |
| `$1` … `$9` | Arguments positionnels              |
| `$@`        | Tous les arguments (liste)          |
| `$#`        | Nombre d'arguments                  |
| `$?`        | Code retour de la dernière commande |
| `$$`        | PID du script en cours              |
| `$LINENO`   | Numéro de ligne courant             |

### Redirections

| Syntaxe     | Signification                                   |
| ----------- | ----------------------------------------------- |
| `>`         | Réécrire stdout vers un fichier                 |
| `>>`        | Ajouter stdout à un fichier                     |
| `2>`        | Rediriger stderr                                |
| `&>`        | Rediriger stdout + stderr                       |
| `\|`        | Pipeline — passer stdout à la commande suivante |
| `/dev/null` | Supprimer toute sortie                          |

***

:::tip[Structure minimale d'un script robuste]


```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# --- Fonctions ---
usage() { echo "Usage: $0 <argument>"; exit 1; }
trap 'echo "Erreur ligne $LINENO"; exit 1' ERR

# --- Vérification des arguments ---
[[ $# -lt 1 ]] && usage

# --- Corps du script ---
echo "Argument reçu : $1"
```

1. Déclarer les variables et fonctions → [📦 Basics](/notes/_procédures/centre-de-documents/bash/-basics) et [🧱 Fonctions](/notes/_procédures/centre-de-documents/bash/-fonctions)
2. Gérer les cas d'erreur avec `trap` → [🧪 Try - Catch en BASH (avec trap)](/notes/_procédures/centre-de-documents/bash/-try---catch-en-bash-avec-trap)
3. Tester les conditions et les fichiers → [🔀 Conditions](/notes/_procédures/centre-de-documents/bash/-conditions)
4. Itérer sur les données → [🔁 Boucles](/notes/_procédures/centre-de-documents/bash/-boucles)
5. Dispatcher avec `case` pour les menus → [🧩 Case (switch)](/notes/_procédures/centre-de-documents/bash/-case-switch)
6. Capturer les sorties de commandes → [🧵 Substitution de commande](/notes/_procédures/centre-de-documents/bash/-substitution-de-commande)

:::
