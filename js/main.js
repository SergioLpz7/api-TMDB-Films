import { token } from "./config.js";

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
    const imagenURL = "https://image.tmdb.org/t/p/w500";

    div.innerHTML = `
            <h3> ${e.title} </h3>
            <img src="${imagenURL}${e.poster_path} alt="imagen de la pelicula" loading="lazy">
        `;

    cont.appendChild(div);
  });
}
pintarPeliculas();

const inp = document.getElementById("buscador");
inp.addEventListener("input", function (e) {
  let valor = e.target.value.trim().toLowerCase();
  // const peliculas = document.getElementsByClassName("pelicula");
  const peliculas = document.querySelectorAll(".pelicula");
  // console.log(peliculas);
  // console.log(document.querySelectorAll(".pelicula"));

  peliculas.forEach((e) => {
    const titulo = e.querySelector("h3").textContent.toLowerCase();
    console.log(titulo);

    if (titulo.includes(valor)) {
      e.classList.remove("oculta")
    }else e.classList.add("oculta")

  });  
});
