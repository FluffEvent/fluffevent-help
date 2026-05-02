---
title: Modalités de vote des communautés pour l'association soutenue
---

## Méthode de vote utilisée

La méthode de vote utilisée pour le classement des associations sélectionnées et soumises au vote des communautés est la "**méthode de meilleure médiane**". Concrètement, chaque votant a exprimé ses préférences en classant les associations du choix 1 (association préférée) au choix 6 (association moins préférée). La méthode de vote classe les associations en fonction de la médiane de leurs choix.


## Lecture des résultats du vote des communautés

Les résultats du vote des communautés sont présentés sous la forme d'un classement des associations sélectionnées, du choix médian le plus préféré (le plus proche du choix 1) au choix médian le moins préféré (le plus proche du choix 6).

Le choix médian représente le choix qui serait exprimé par un votant au milieu de la distribution des votes pour chaque association. Le classement permet ainsi de déterminer l'association généralement préférée des communautés, qui obtient le choix médian le plus proche du choix 1 et qui devrait être soutenue par l'événement.


## Calcul des résultats du vote des communautés

Illustrons le calcul des résultats avec un exemple, tel que pour 4 associations et 6 votes reçus :
- Classement du vote 1 : A (choix 1) > B (choix 2) > C (choix 3) > D (choix 4)
- Classement du vote 2 : A (choix 1) > B (choix 2) > D (choix 3) > C (choix 4)
- Classement du vote 3 : A (choix 1) > C (choix 2) > B (choix 3) > D (choix 4)
- Classement du vote 4 : B (choix 1) > A (choix 2) > D (choix 3) > C (choix 4)
- Classement du vote 5 : B (choix 1) > C (choix 2) > A (choix 3) > D (choix 4)
- Classement du vote 6 : C (choix 1) > B (choix 2) > D (choix 3) > A (choix 4)

Pour chaque association, le choix médian va combiner deux valeurs :
- La valeur médiane des choix exprimés, arrondie à la valeur supérieure en cas de nombre pair de votes.
- La proportion de votes exprimant la valeur médiane dans la moitié des votes préférant l'association, sur l'ensemble des votes exprimant la valeur médiane.

Détaillons le calcul pour obtenir le résultat de l'association B :
- Les choix exprimés sont : 2, 2, 3, 1, 1, 2
- On trie les choix et on les coupe en deux moitiés : 1, 1, 2 ; 2, 2, 3
- La valeur médiane est 2, arrondie au supérieur à 2
- Dans l'ensemble, il y a 3 votes exprimant cette valeur médiane comme choix
- Dans la première moitié, il y a 1 vote exprimant cette valeur médiane comme choix
- On ajoute alors la proportion 1 ÷ 3 = 0.33 à la valeur médiane
- On obtient enfin un choix médian de 2.33 pour l'association B

On peut appliquer le même raisonnement pour calculer le choix médian des autres associations.

<details>
<summary>Voir le détail de tous les calculs</summary>

Pour l'association A :
- Choix exprimés : 1, 1, 1, 2, 3, 4
- Triés et coupés en deux : 1, 1, 1 ; 2, 3, 4
- Valeur médiane : 1.5, arrondie au supérieur à 2
- Proportion dans la première moitié : 0 ÷ 1 = 0
- Choix médian : 2.0

Pour l'association B (rappel) :
- Choix exprimés : 2, 2, 3, 1, 1, 2
- Triés et coupés en deux : 1, 1, 2 ; 2, 2, 3
- Valeur médiane : 2, arrondie au supérieur à 2
- Proportion dans la première moitié : 1 ÷ 3 = 0.33
- Choix médian : 2.33

Pour l'association C :
- Choix exprimés : 3, 4, 2, 4, 2, 1
- Triés et coupés en deux : 1, 2, 2 ; 3, 4, 4
- Valeur médiane : 2.5, arrondie au supérieur à 3
- Proportion dans la première moitié : 0 ÷ 1 = 0
- Choix médian : 3.0

Pour l'association D :
- Choix exprimés : 4, 3, 4, 3, 4, 3
- Triés et coupés en deux : 3, 3, 3 ; 4, 4, 4
- Valeur médiane : 3.5, arrondie au supérieur à 4
- Proportion dans la première moitié : 0 ÷ 3 = 0
- Choix médian : 4.0

Le raisonnement serait moins intuitif mais aussi valable en arrondissant la valeur médiane à l'inférieur, par exemple pour l'association D :
- Valeur médiane : 3.5, arrondie à l'inférieur à 3
- Proportion dans la première moitié : 3 ÷ 3 = 1
- Choix médian : 4.0

</details>

Au final, les résultats de ce vote seraient les suivants :
1. Association A, avec un choix médian de 2.0
2. Association B, avec un choix médian de 2.33
3. Association C, avec un choix médian de 3.0
4. Association D, avec un choix médian de 4.0

Et l'association A serait ainsi celle généralement préférée et qui devrait être soutenue par l'événement.

## FAQ

<details>
<summary>Pourquoi utiliser la méthode de meilleure médiane pour le vote des communautés ?</summary>

La méthode de meilleure médiane est utilisée pour le vote des communautés car elle permet à la fois de prendre en compte les préférences de tous les votants de manière équitable et d'exprimer l'ensemble des résultats en un classement simple à lire.

Cette méthode de vote peut être plus initialement moins intuitive que d'autres et notre implémentation ne permet pas de classer deux associations ex-aequo, mais elle permet de refléter les préférences collectives des communautés en un seul vote et d'éviter les biais liés à la polarisation des votes.

</details>
