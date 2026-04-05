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

    console.log("titulo: " + titulo + " valor: " + valor);
  });
});

function popup(pelicula) {
  const existe = document.getElementById("popup")
  if (existe) {existe.remove()}
  const cont = document.getElementById("contenedor");
  const div = document.createElement("div");
  div.id = "popup"
  div.className = "popup"
  div.innerHTML = `<h2> ${pelicula.title} </h2>
    <img src="${imagenURL}${pelicula.poster_path} alt="imagen de la pelicula" loading="lazy">
    <p> ${pelicula.backdrop_path}

  `
  cont.appendChild(div)

}
