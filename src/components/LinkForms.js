// Permitir añadir un nuevo enlace

import { useState } from "react";
import React from "react";

const LinkForm = (props) => {

    const inicialStatateValues ={
        url:'',
        name:'',
        description:''
    };

    const [values, setValues] = useState(inicialStatateValues)

    //Funcion para onchange Llame a una función cuando un usuario cambie el contenido de un campo de entrada
    const handleInputtChange = (e) =>{
        const {name, value} = e.target
        setValues({...values,[name]:value})
    }

//Crear una función para el envio de la informacion evento del boton guardar
// onsubmit Llame a una función cuando se envía un formulario
const handeleSubmi = (e) => {
    e.preventDefault();
    props.addOrEditLink(values);
    setValues({...inicialStatateValues})
}

    return (
        <form className="card card-body" onSubmit={handeleSubmi}>
            <div className="form-group input-group p-2"  >
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" placeholder="https://someurl.com" name="url"  onChange={handleInputtChange } value={values.url}/>
            </div>

            <div className="form-group input-group p-2">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className="form-control" name="name" placeholder="Nombre del sitio Web" onChange={handleInputtChange} value={values.name}/>
            </div>

            <div className="form-group p-2">
                <textarea name="description" rows="3" className="form-control" placeholder="Escribe una descripcion" onChange={handleInputtChange} value={values.description}></textarea>
            </div>

            <div className="col text-center">
                <button className="btn regular-button btn-primary"> Guardar </button>
            </div>

        </form>
    )
}

export default LinkForm;