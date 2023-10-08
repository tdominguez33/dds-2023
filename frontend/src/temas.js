import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "./temas.css"
import Cursos from './cursos';

function Temas() {
  const [ListaTemas, setListaTemas] = useState(null)

  useEffect(() => {
    // Realiza la solicitud a la URL
    fetch('http://localhost:8010/proxy/cursos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud')
        }
        return response.json()
      })
      .then((jsonData) => {
        listarTemas(jsonData)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  const listarTemas = (array) => {
    let ids = []
    let temas = []
    let lista = []

    // Filtramos los repetidos, guardamos los ids y los nombres de los cursos
    for(let i = 0; i < array.length; i++){
      if (!ids.includes(array[i].tema.id)){
        ids.push(array[i].tema.id)
        temas.push(array[i].tema.nombre)
      }
    }

    // Generamos el código HTML para cada tema disponible
    // Cada elemento de la lista linkea a /temas/cursos/id con id el valor de id que tiene asociado cada tema
    for(let i = 0; i < ids.length; i++){
      lista.push(<li class="temaLista"><Link to={`./cursos/${ids[i]}`}><button class="botonLista">{temas[i]}</button></Link></li>)
    }
    setListaTemas(lista)
  };
  

  return (
    <div className="Home2">
      {(ListaTemas !== null)? (
        <div class="centered">
          <div>
          <h1 class="title">Temas:</h1>
          <ul class="noPadding">{ListaTemas}</ul>
          </div>

          <div class="temaInfo">
          <Routes>
            {/* Especificamos el nombre que va tener el parametro */}
            <Route path="/cursos/:id" element={<Cursos />} />
          </Routes>
          </div>

        </div>
        
      ) : (
        <div class="centered">
          <h1 class="title">Cargando...</h1>
        </div>
      )}
    </div>
  );
}

export default Temas;