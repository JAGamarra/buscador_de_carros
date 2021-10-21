// ! Variables
const marca = document.querySelector("#marca");
const years = document.querySelector("#year"); //Select que agrupa los años
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const result = document.querySelector("#resultado");

//Obtenemos el año máximo y mínimo
const maxYear = new Date().getFullYear();
const minYear = maxYear - 11;

//Generar un objeto con los diferentes parámetros de la búsqueda
const searchData = {
  marca: "",
  year: "",
  maximo: "",
  minimo: "",
  puertas: "",
  transmision: "",
  color: "",
};
// ! Eventos
document.addEventListener("DOMContentLoaded", () => {
  //Carga y muestra la BD (db.js) de los carros al cargar el DOM
  showCars(autos);

  //Llena las opciones del select con los valores de los años
  fillSelect();
});

//Event Listeners para los select de busqueda
marca.addEventListener("change", (e) => {
  searchData.marca = e.target.value;
  carFilter();
});
years.addEventListener("change", (e) => {
  searchData.year = e.target.value;
  carFilter();
});
minimo.addEventListener("change", (e) => {
  searchData.minimo = e.target.value;
  carFilter();
});
maximo.addEventListener("change", (e) => {
  searchData.maximo = e.target.value;
  carFilter();
});
puertas.addEventListener("change", (e) => {
  searchData.puertas = e.target.value;
  carFilter();
});
transmision.addEventListener("change", (e) => {
  searchData.transmision = e.target.value;
  carFilter();
});
color.addEventListener("change", (e) => {
  searchData.color = e.target.value;
  carFilter();
});

// ! Funciones
function showCars(autos) {
  cleanHTML(); //Elimina el HTML previo
  //Recorremos el objeto auto que simula ser nuestra BD
  autos.forEach((auto) => {
    const autosHTML = document.createElement("p");
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    autosHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} puertas - transmisión: ${transmision} - color: ${color} - precio: $${precio}
    `;

    result.appendChild(autosHTML);
  });
}

//Limpiar HTML
function cleanHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

//Generar los años del select
function fillSelect() {
  for (let i = maxYear; i >= minYear; i--) {
    const option = document.createElement("option"); //Creamos un tag option
    option.value = i; //Agregamos el valor de i al atributo value
    option.textContent = i; //Agremamos el valor de i al contenido de la etiqueta
    years.appendChild(option); //Agregamos la etiqueta dentro de un select (years)
  }
}

//Función para filtrar los resultados en base a la búsqueda
function carFilter() {
  const filterResult = autos
    .filter(brandFilter)
    .filter(yearFilter)
    .filter(minPriceFilter)
    .filter(maxPriceFilter)
    .filter(nDoors)
    .filter(typeOfTransmission)
    .filter(carColor);

  if (filterResult.length) {
    showCars(filterResult);
  } else {
    noResults();
  }
}

function noResults() {
  const noResultMsg = document.createElement("p");
  noResultMsg.classList.add("alert", "error");
  noResultMsg.textContent = "No hay coincidencias con tu búsqueda.";
  cleanHTML();
  result.appendChild(noResultMsg);
}

// * Funciones que realizan los filtros por cada campo
function brandFilter(auto) {
  const { marca } = searchData;
  if (marca) {
    return auto.marca === searchData.marca;
  }
  return auto;
}

function yearFilter(auto) {
  const { year } = searchData;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}

function minPriceFilter(auto) {
  const { minimo } = searchData;
  if (minimo) {
    return auto.precio >= parseInt(minimo);
  }
  return auto;
}

function maxPriceFilter(auto) {
  const { maximo } = searchData;
  if (maximo) {
    return auto.precio <= parseInt(maximo);
  }
  return auto;
}

function nDoors(auto) {
  const { puertas } = searchData;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}

function typeOfTransmission(auto) {
  const { transmision } = searchData;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function carColor(auto) {
  const { color } = searchData;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
