// Importer l'array books
import { books } from './data/books';
import { randomBD, categBackground, stringifyBasket } from './services/functions';


// PROGRAMME
const alreadyOrdered = localStorage.getItem('alreadyOrdered');
const panier = [];

// Le body contient une div à l'id APP.
const app = document.createElement('div');
app.id = 'app';
const { body } = document;
body.append(app);


// Création d'un H1
const h1 = document.createElement('h1');
h1.innerText = 'Bibliothèque Brendan Eich';
app.append(h1);
h1.style.textAlign = 'center';
// Creation du header
const header = document.createElement('header');
header.innerHTML = `<p>La BD du jour est <strong> ${randomBD(books)}</strong>.<p>`;
header.style.backgroundColor = 'black';
header.style.color = 'white';
app.append(header);

// bonus btn (footer) qui supprime tout
const bonusDeleteBtn = document.createElement('button');
bonusDeleteBtn.innerText = 'Annuler';
bonusDeleteBtn.style.display = 'none';
bonusDeleteBtn.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});

// Creation du main, où l'on itère sur chaque livre
const main = document.createElement('main');
const divPanier = document.createElement('div');

books.forEach((book) => {
  const divBook = document.createElement('div');
  divBook.style.backgroundColor = categBackground(book);
  const h3 = document.createElement('h3');
  h3.innerText = `${book.titre} - ${book.auteur}`;
  const image = document.createElement('img');
  // image par défault si pas d'image
  if (!book.image) {
    image.src = '/assets/images/book-default.png';
  } else { image.src = book.image; }

  image.style.width = '200px';
  // description par défault si description vide
  const description = document.createElement('p');
  if (!book.resume) {
    description.innerText = 'description indisponible';
  } else { description.innerText = book.resume; }
  const genre = document.createElement('p');
  genre.innerText = book.categorie;
  // bouton de reservation
  const resBtn = document.createElement('button');
  resBtn.innerText = 'Réserver';
  divBook.append(h3, image, description, resBtn);
  if (!book.disponible) {
    resBtn.disabled = 'true';
    const warning = document.createElement('p');
    warning.innerText = 'livre indisponible';
    warning.style.color = 'red';
    divBook.append(warning);
  }
  resBtn.addEventListener('click', () => {
    // impossible de reserver plus de 3 livres
    if (panier.length >= 3) {
      window.alert('impossible de réserver plus de 3 livres');
    } else {
      resBtn.disabled = 'true';
      const copieBook = {
        id: book.id,
        titre: book.titre,
        disponible: book.disponible,
        resume: book.resume,
        auteur: book.auteur,
        categorie: book.categorie,
        image: book.image,
      };
      // ajout du clone au panier
      panier.push(copieBook);
      divPanier.innerHTML = stringifyBasket(panier);
      bonusDeleteBtn.style.display = 'block';
    }
  });

  main.append(divBook);
});
app.append(main);


// Element footer
const footer = document.createElement('footer');
footer.innerText = 'Merci de votre confiance - ';
footer.style.backgroundColor = 'black';
footer.style.color = 'white';
const borrowBtn = document.createElement('button');
borrowBtn.innerText = 'Emprunter';


borrowBtn.addEventListener('click', () => {
  // la page se vide et une nouvelle apparait
  if (panier.length > 0) {
    app.style.display = 'none';
    const newPage = document.createElement('div');
    const word = (panier.length === 1 ? 'livre' : 'livres');
    const now = new Date();
    const heure = `${now.getHours() + 2} h ${now.getMinutes()}`;
    newPage.innerHTML = `Vos ${panier.length} ${word} sont empruntés. Vous pouvez passer les chercher aujourd'hui avant ${heure}`;
    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = 'Annuler la commande';
    cancelBtn.addEventListener('click', () => {
      localStorage.removeItem('alreadyOrdered');
      window.location.reload();
    });
    newPage.append(cancelBtn);
    body.append(newPage);
    localStorage.setItem('alreadyOrdered', true);
    localStorage.setItem('panier', panier.length);
    localStorage.setItem('heure', heure);
  } else { window.alert('impossible de reserver 0 livre'); }
});

footer.append(borrowBtn, divPanier, bonusDeleteBtn);
app.append(footer);

// LOCAL STORAGE, EN CAS DE DEUXIEME VISITE MAIS COMMANDE EN COURS
if (alreadyOrdered) {
  app.style.display = 'none';
  const newPage = document.createElement('div');
  const word = (panier.length === 1 ? 'livre' : 'livres');
  newPage.innerHTML = `Vos ${localStorage.getItem('panier')} ${word} sont empruntés. Vous pouvez passer les chercher aujourd'hui avant ${localStorage.getItem('heure')}`;
  const cancelBtn = document.createElement('button');
  cancelBtn.innerText = 'Annuler la commande';
  cancelBtn.addEventListener('click', () => {
    localStorage.removeItem('alreadyOrdered');
    window.location.reload();
  });
  newPage.append(cancelBtn);
  body.append(newPage);
  localStorage.setItem('alreadyOrdered', true);
}
footer.append(borrowBtn, divPanier);
app.append(footer);
