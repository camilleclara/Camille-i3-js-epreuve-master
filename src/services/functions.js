// Fonction qui prend une liste d'objets livres et la transforme en liste
export function stringifyBasket(basket) {
  let htmlString = '<ul>';
  basket.forEach((book) => {
    htmlString += `<li>${book.titre} - ${book.auteur}</li>`;
  });
  htmlString += '</ul>';
  return htmlString;
}
// Fonction qui retourne un entier au hasard entre 0 et max
export function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// Fonction qui choisit un element de categorie BD au hasard dans une liste
export function randomBD(list) {
  let choice = '';
  while (!choice) {
    const num = randInt(list.length - 1);
    if (list[num].categorie === 'bd') {
      choice = `${list[num].titre} par ${list[num].auteur}`;
    }
  }
  return choice;
}
// Fonction qui set un background pour l'element en fonction de sa catégorie
export function categBackground(book) {
  switch (book.categorie) {
    case 'bd':
      return 'azure';
    case 'essai':
      return 'antiquewhite';
    case 'roman':
      return 'honeydew';
    default:
      return 'seashell';
  }
}
// Fonction pour afficher la page de reservation
