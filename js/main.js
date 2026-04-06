import { token } from "./config.js";
const imagenURL = "https://image.tmdb.org/t/p/w500";
let listaPeliculas = [];
async function datosPeliculas() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=es-ES",
      options,
    );
    const data = await res.json();

    console.log(data.results);
    return data.results;
  } catch (err) {
    console.log("Error:", err);
    return [];
  }
}

async function pintarPeliculas() {
  const cont = document.getElementById("contenedor");
  const pelis = await datosPeliculas();
  listaPeliculas = pelis;

  cont.innerHTML = "";

  pelis.forEach((e, i) => {
    const div = document.createElement("div");
    div.className = "pelicula";

    div.innerHTML = `
        <h3> ${e.title} </h3>
        <img src="${imagenURL}${e.poster_path} alt="imagen de la pelicula" loading="lazy">
        `;

    cont.appendChild(div);
    div.addEventListener("click", () => {
      popup(e, i);
    });
  });
}
pintarPeliculas();

const inp = document.getElementById("buscador");
inp.addEventListener("input", function (e) {
  let valor = e.target.value.trim().toLowerCase();
  const peliculas = document.querySelectorAll(".pelicula");

  peliculas.forEach((e) => {
    const titulo = e.querySelector("h3").textContent.toLowerCase();

    if (titulo.includes(valor)) {
      e.classList.remove("oculta");
    } else e.classList.add("oculta");
  });
});

function popup(pelicula, indice) {
  const anterior = document.querySelector(".overlay");
  if (anterior) anterior.remove();

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const div = document.createElement("div");
  div.id = "popup";
  div.className = "popup";
  div.innerHTML = `
      <button class="btn-cerrar">X</button>
      <img src="${imagenURL}${pelicula.backdrop_path}" alt="${pelicula.title}">
      <div class="popup-contenido">
        <h2>${pelicula.title}</h2>
        <div class="puntuacion">
          <span class="nota-principal">⭐ ${pelicula.vote_average.toFixed(1)}</span>
          <span class="votos-secundarios">(${pelicula.vote_count} votos)</span>
        </div>
        <p style="color: #ccc; line-height: 1.6;">${pelicula.overview || "Sin descripción disponible."}</p>
        <p><small><b>Fecha de estreno: <b>${pelicula.release_date}</small></p>
      </div>
  `;

  const nav = document.createElement("div");
  nav.className = "nav-flechas";

  const btnIzq = document.createElement("button");
  btnIzq.className = "flecha-izq";
  btnIzq.textContent = "\u276E";
  btnIzq.style.visibility = (indice === 0) ? "hidden" : "visible";
  btnIzq.onclick = () => cambiarPeli(indice - 1);
  const btnDer = document.createElement("button");
  btnDer.className = "flecha-der";
  btnDer.textContent = "\u276F";
  btnDer.style.visibility = (indice === listaPeliculas.length - 1) ? "hidden" : "visible";
  btnDer.onclick = () => cambiarPeli(indice + 1);

  nav.appendChild(btnIzq);
  nav.appendChild(btnDer);

  div.querySelector(".btn-cerrar").addEventListener("click", () => overlay.remove());

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });

  overlay.appendChild(div);
  overlay.appendChild(nav);
  document.body.appendChild(overlay);
}

function cambiarPeli(i) {
  if (i >= 0 && i < listaPeliculas.length) {
    const nuevaPeli = listaPeliculas[i];
    popup(nuevaPeli, i);
  }
}