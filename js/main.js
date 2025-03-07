'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessage = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');
const inputRace = document.querySelector('.js-input-race');
const GITHUB_USER = 'Lurdesmg';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;


//Objetos con cada gatito //Esto esta en el localStorage que hemos traido con el fetch
/*
const kittenData_1 = {
    image: "https://dev.adalab.es/gato-siames.webp",
    name: "Anastacio",
    desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
    race: "Siamés",
};
const kittenData_2 = {
    image: "https://dev.adalab.es/sphynx-gato.webp",
    name: "Fiona",
    desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
    race: "Sphynx",
};
const kittenData_3 = {
    image: "https://dev.adalab.es/maine-coon-cat.webp",
    name: "Cielo",
    desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
    race: "Maine Coon",
};
*/ 
//const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];
let kittenDataList = [];

const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

if (kittenListStored !== null) {
    kittensList = kittenListStored;
    renderKittenList(kittenDataList)
  //si existe el listado de gatitos en el local storage
  // vuelve a pintar el listado de gatitos
  //...
  //completa el código...
} else {
  //sino existe el listado de gatitos en el local storage
  //haz la petición al servidor
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem('kittenList', JSON.stringify(data.results));
        kittenDataList = data.results
        renderKittenList(kittenDataList)
      //guarda el listado obtenido en el local storage.
      //vuelve a pintar el listado de gatitos
      //completa el código...
    })
    .catch((error) => {
    console.error(error);
    });
}

fetch(SERVER_URL, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then((response) => response.json())
  .then((data)=> {
    console.log(data);
    kittenDataList = data.results
    renderKittenList(kittenDataList)
  })
 

//Funciones
function renderKitten(kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
    const newKittenDataObject = {
        name: inputName.value,
        desc: inputDesc.value,
        image: inputPhoto.value,
        race: inputRace.value,
    }
    if (valueDesc === "" || valuePhoto === "" || valueName === "" || valueRace ==="") {
        labelMessage.innerHTML = "¡Uy! parece que has olvidado algo";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "" && valueRace !=="") {
            

        fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newKittenDataObject),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    labelMessage.innerHTML = "Mola! Un nuevo gatito en Adalab!";
                    kittenDataList.push(newKittenDataObject);
                    localStorage.setItem('kittenList', JSON.stringify(kittenDataList));
                    renderKittenList(kittenDataList);
                    inputDesc.value = "";
                    inputPhoto.value = "";
                    inputName.value = "";
                    inputRace.value = "";
                    //Completa y/o modifica el código:
                    //Agrega el nuevo gatito al listado
                    //Guarda el listado actualizado en el local stoarge
                    //Visualiza nuevamente el listado de gatitos
                    //Limpia los valores de cada input
                    } else {
                    //muestra un mensaje de error.
                    labelMessage.innerHTML = "¡Uy hay un problema con el servidor!";
                    }
            });

        }
    };
}  

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    const raceSearchText = input_search_race.value
    listElement.innerHTML = "";
    const kittenListFiltered = kittenDataList
        .filter((kitten) => kitten.desc.includes(descrSearchText))
        .filter((kitten) => kitten.race.includes(raceSearchText));
  //Vuelve a pintar el listado de gatitos filtrados en el HTML.
     renderKittenList(kittenListFiltered);
}

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);






