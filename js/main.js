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
      options);
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
    const imagenURL = "https://image.tmdb.org/t/p/w500";

    div.innerHTML = `
            <h2> ${e.title} </h2>
            <img src="${imagenURL}${e.backdrop_path} alt="imagen de la pelicula">
        `;

    cont.appendChild(div);
  });
}
pintarPeliculas();
