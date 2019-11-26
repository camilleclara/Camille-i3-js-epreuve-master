# Book en stock

## Infos
Novembre 2019 - WAD 2019

JavaScript: Epreuve pratique en 5h

Répartition sur 76pts:
- fonctionnement final du site: 36pts
- maîtrise de JavaScript/JQuery et logique: 25pts
- qualité du code (architecture, indentation, nommage...): 15pts

## Contexte
Vous êtes codeuse JavaScript dans une agence web. Vous venez de gagner un appel d'offre pour le site de la bibliothèque du quartier.

Votre n+1 doit aller à cette bibliothèque ASAP avec une proposition. Vous êtes chargée de faire un POC (Prove Of Concept) JavaScript avant ce soir.

Votre site doit permettre aux usagers d'emprunter des ouvrages en ligne.

Télécharger et utiliser cette seed pour produire votre SPA (Single Page Application).

Le script `./src/index.js` est déjà lié à cette page d'accueil `./public/index.html` grâce à Webpack.

`npm install` installe les packages de la seed

`npm start` lance la seed en mode "développement"

## Consignes
*Toutes sources d'information autorisées, mais pas de communication pendant le cours. L'aspect individuel/unique de la résolution du problème fait partie de la note*

*Les copier/coller de code d'internet sont sanctionnés.*

*Vous n'avez pas le droit de toucher au HTML. Tout le site est généré depuis le JavaScript. Pour le CSS, pas de limitation.*

*JQuery est installé et utilisable. Toutes librairies autorisées (insallation via NPM). Frameworks non autorisés.*

Settings utiles pour profiter de ESLint et Prettier :
```
{
  "editor.formatOnSave": false,
  "eslint.autoFixOnSave": true,
  "eslint.validate": ["javascript"],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

Avant 16h45, envoyez votre travail aux formateurs par mail (zippez votre épreuve **sans le dossier node_modules**) ou via lien github.

### Modélisation de données
Il n'y a que 3 catégories possibles pour les ouvrages: "bd", "roman" ou "essai". Au lancement du site, tous les livres sont disponibles
- Dans `./src/data/books.js` il y a 3 livres. Ajouter les livres suivants (descriptions et images facultatives):
    - La bd "La Caste des Méta-Barons T2", de A. Jodorowsky
    - Le roman "La Parfaite lumière", de E. Yoshikawa
    - L'essai "L'apologie de Socrate", de Platon
    - La bd "Isaac le pirate T1", de C. Blain
- Importer l'Array `books` dans l'index.js

### Transformation des données en éléments du DOM
Les éléments suivants sont créés dans le `body` via JavaScript:
- un `h1` avec le nom du site
- un élément `header` met en avant une BD choisie au hasard au lancement de la page
- un élément HTML `main`. C'est le catalogue montrant tous les livres + infos (sauf ID)
    - si pas d'images, afficher `/assets/images/book-default.png`
    - si pas de description, afficher *"Description indisponible."*
    - chaque livre présente aussi un bouton "réserver"
- un élément `footer` présente la réservation en cours (vide au début), et un bouton "emprunter"

### Manipulation du DOM et interaction utilisateur
- Lorsqu'un utilisateur clique sur "réserver" pour un livre
    - il apparaît dans la réservation du `footer`
    - ce bouton "réserver" devient `disabled`
- Lorsqu'un utilisateur clique sur "emprunter", la page se vide, et un message indique "Vos x livre(s) sont empruntés. Vous pouvez passer les chercher aujourd'hui, avant h+2", ou
    - "x" est le nombre de livres
    - "livre(s)" ne prend un "s" que s'il y en a plusieurs
    - "h+2" est l'heure actuelle + 2h
- sur cet écran, un bouton "Annuler la commande" permet de  recharger automatiquement la page.

Les actions suivantes sont impossibles. Si un utilisateur essaye, une alerte le prévient et rien ne se passe :
- "emprunter" 0 livre 
- "réserver" plus de 3 livres

## LocalStorage
Si l'utilisateur a déjà emprunté des livres précédemment, il ne voit plus le site en se reconnectant. A la place, il voit la même phrase qu'après l'emprunt: "Vos x livre(s) sont empruntés. Vous pouvez passer les chercher aujourd'hui, avant h".

Le bouton "Annuler la commande" permet de vider le localstorage, puis recharge la page.


### Bonus (pas compté dans les points):
- Améliorer l'affichage de votre site grâce aux SCSS
- Mettez les livres dans un fichier JSON valide, dans "./public/assets/data/livres.json, et requêtez-le avec `fetch` ou `axios` au début du code
- Un bouton dans le `footer` permet d'annuler toute la réservation d'un coup
- Chaque présentation de livre a un background différent, en fonction de sa catégorie
- 4 boutons permettent de cacher/afficher les livres par catégorie:
    - un bouton "tout voir" qui montre tout
    - un bouton pour chaque catégorie, qui cache les livres des autres catégories
