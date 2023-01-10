//Encargado de listar todos los enlaces
import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForms";

import { db } from '../firebase'
const Links = () => {

    const [links, setLinks] = useState([])

    const addOrEditLink = async (linkObject) => {
        await db.collection('links').doc().set(linkObject);
        console.log('nueva tarea agregada')
    }

    const onDeliteLink = async (id) => {
        if (window.alert("¿Esta seguro de querer eliminar?")){
          await  db.collection('links').doc(id).delete();
          console.log('eliminada')
        }
    }

    const getLinks = async () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
    }

    useEffect(() => {
        getLinks();
    }, [])

    return (
        <div>
            <div className="col-md-4 p-2">
                <LinkForm addOrEditLink={addOrEditLink} />
                <div className="col-md-8 p-4 w-100" >
                    {links.map(link => (
                        <div className="card mb-1 p-2 text-center" key={link.id}>
                            <div className="card-body">
                                <h4>{link.name}</h4>
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank">Ir al sitio Web</a>
                            </div>
                            <div>
                                <i className="material-icons text-danger" onClick={() => onDeliteLink(link.id)}>delete</i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Links;