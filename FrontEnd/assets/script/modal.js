
let modal = null; // initialise la variable 'modal' à null (fermée)

// Fonction pour ouvrir la modale
const open_modal = function (event) {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href')); // selectionne la modale "cible" à partir de l'attribut href du lien cliqué (#modal1)
    target.style.display = null; //definit la modale avec une valeur par défaut à "null" (enlève le "display none")
    target.style.zIndex = "2"; // Définit un index z pour placer la modale au-dessus des autres éléments de la page
    target.removeAttribute('aria-hidden'); // Supprime aria-hidden pour rendre la modale accessible aux lecteurs d'écran
    target.setAttribute('aria-modal', true); // Ajoute aria-modal = true pour indiquer qu'il s'agit d'une modale

    modal = target; // Attribue la modale actuelle à la variable 'modal'

    modal.addEventListener('click', close_modal); // au click "fermer la modale" 

    modal.querySelector('.js-modal-close').addEventListener('click', close_modal); // au click sur le bouton "fermer la modale"

    modal.querySelector('.modal-contain').addEventListener('click', function (event) {
        event.stopPropagation(); // au click dans le conteneur de la modale

        event.stopPropagation(); // Arrête la propagation du click "fermer la modale" à l'interieur de la modale
    });
}

// Fonction pour "fermer la modale"
const close_modal = function (event) {
    if (modal === null) return; // Si la variable 'modal' est null, elle est déjà fermée, on ne fait rien.
    event.preventDefault();
    modal.style.display = "none"; // rend la modale invisible
    modal.setAttribute('aria-hidden', true); // Ajoute aria-hidden = true pour cacher la modale aux lecteurs d'écran
    modal.removeAttribute('aria-modal'); // Supprime l'attribut aria-modal pour indiquer que la modale n'est plus active
    modal.removeEventListener('click', close_modal); // Supprime le click pour "fermer la modale"
    modal.querySelector('.js-modal-close').removeEventListener('click', close_modal); // Supprime le click pour "fermer la modale" sur le bouton
    modal = null; // Réinitialise la variable 'modal' à null
    window.location.reload();
}

/* action ouvrir la modale au click sur un lien de cette classe */
document.querySelectorAll('.js-modal').forEach(a => { // Sélectionne tous les éléments avec la classe 'js-modal'
    a.addEventListener("click", open_modal);
});

/*--------------contenu des modales------------------------------------*/
const divModalGallery = document.getElementById("galleryPhoto");
const divModalAjout = document.getElementById("ajout");
const fleche_retour = document.getElementById("retour");

function addClass(element, className) {
    element.classList.add(className);
}

// Fonction pour supprimer une classe d'un élément
function removeClass(element, className) {
    element.classList.remove(className);
}
/*---------gestionnaire d'évènements au click sur la modale--------- */
// Variable pour suivre l'état de la fenêtre modale actuellement affichée
// click sur le bouton "Ajouter" dans la première modale
document.getElementById("ajouter").addEventListener("click", function () {
    addClass(divModalGallery, "hidden"); // Supprime le premier contenu de la modale
    removeClass(divModalGallery, "active"); // supprime la class hidden
    addClass(divModalAjout, "active"); // Ajoute la deuxième contenu de la modale
    removeClass(divModalAjout, "hidden"); // ajoute le deuxième contenu de la modale
   
});

// click sur la flêche "retour" de la deuxieme modale
const modalAjout = document.getElementById("ajout")
modalAjout.addEventListener("click", function (event) {
    if (event.target.id === "retour") {
        addClass(divModalAjout, "hidden"); // Supprime la deuxième contenu de la modale
        removeClass(divModalAjout, "active"); // ajoute le deuxième contenu de la modale
        removeClass(divModalGallery, "hidden"); // supprime la class hidden
        addClass(divModalGallery, "active"); // Ajoute le premier contenu de la modale
    }
});

 