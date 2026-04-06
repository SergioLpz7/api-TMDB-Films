import { token } from "./config.js";
const imagenURL = "https://image.tmdb.org/t/p/w500";
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

  cont.innerHTML = "";

  pelis.forEach((e) => {
    const div = document.createElement("div");
    div.className = "pelicula";

    div.innerHTML = `
        <h3> ${e.title} </h3>
        <img src="${imagenURL}${e.poster_path} alt="imagen de la pelicula" loading="lazy">
        `;

    cont.appendChild(div);
    div.addEventListener("click", () => {
      popup(e);
    })
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

function popup(pelicula) {
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
          <span class="nota-principal">⭐ ${pelicula.vote_average}</span>
          <span class="votos-secundarios">(${pelicula.vote_count} votos)</span>
        </div>
        <p style="color: #ccc; line-height: 1.6;">${pelicula.overview || "Sin descripción disponible."}</p>
        <p><small><b>Fecha de estreno: <b>${pelicula.release_date}</small></p>
      </div>
  `;

  div.querySelector(".btn-cerrar").addEventListener("click", () => overlay.remove());
  
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });

  overlay.appendChild(div);
  document.body.appendChild(overlay);

}
