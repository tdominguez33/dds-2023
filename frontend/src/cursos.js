import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./cursos.css"

function Cursos(props) {
    const { id } = useParams() //Obtenemos el valor de ID desde la URL
    const [BotonVolver, setBotonVolver] = useState(null)
    const [ListaCursos, setListaCursos] = useState(null)
    
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
            listarCursos(jsonData, id)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);   // Ejecutamos la función cada vez que id cambia


    // Buscamos entre todos los cursos del array aquellos cuyo id coincide
    const listarCursos = (array, id) => {
        let cursosID = []
        let cursosNombres = []
        let cursosFechas = []
        //let cursosHorarios = []
        let lista = []
        for(let i = 0; i < array.length; i++){
            // Si el ID de tema coincide agregamos el ID de curso y sus otros datos a las listas
            if(array[i].tema.id == id){
                cursosID.push(array[i].id)
                cursosNombres.push(array[i].nombre)
                
                // Obtenemos fecha y horario
                let fechaParseada = new Date(array[i].fechaInicio)
                cursosFechas.push(fechaParseada.getDate() + "/" + fechaParseada.getMonth() + "/" + fechaParseada.getFullYear())
                //cursosHorarios.push(fechaParseada.getHours() + ":" + fechaParseada.getMinutes())
            }
        }

        //Generamos el código HTML para crear un nuevo curso
        // Parametro1 -> Desde que Tema estoy creando un nuevo Curso
        // Parametro2 -> ID que deberia tener el nuevo curso para no repetir las anteriores
        setBotonVolver(<Link to={`/crearCurso/${id}/${array.length + 1}`}><li class="temaLista"><button class="botonLista">+</button></li></Link>)

        // Generamos el código HTML que muestra todos los cursos de un mismo tema
        for(let i = 0; i < cursosID.length; i++){
            //lista.push(<li class="temaLista"><button class="botonLista">Nombre: {cursosNombres[i]} - Fecha Inicio: {cursosFechas[i]} - Horario: {cursosHorarios[i]}</button></li>)
            lista.push(<li class="temaLista"><button class="botonLista">Nombre: {cursosNombres[i]} - Fecha Inicio: {cursosFechas[i]}</button></li>)
        }

        setListaCursos(lista)

    }

    return (
        <div>
            <Link to="/temas/cursos"><button class="backButton">&lt; Cerrar</button></Link>
            <ul>
                {BotonVolver}
                {ListaCursos}
            </ul>
        </div>
    );
  }
  
  export default Cursos;