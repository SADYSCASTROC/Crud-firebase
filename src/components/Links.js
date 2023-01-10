//Encargado de listar todos los enlaces
import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForms";
import swal from "sweetalert";
import { toast, Toast } from "react-toastify";
import { db } from '../firebase'


const Links = () => {

    const [links, setLinks] = useState([])
    const [currenId, setcurrenId] = useState('')



    const addOrEditLink = async (linkObject) => {
        await db.collection('links').doc().set(linkObject);
        toast('Nueva publicacion agregada', {
            type: 'success'
        })
    }

    const onDeliteLink = async (id) => {
        (swal({
            title: "Esta seguro que desea eliminar el archivo",
            buttons: ["Cancelar", "Elininar"]
        })).then(respuesta => {
            if (respuesta) {
                db.collection('links').doc(id).delete();
                console.log('eliminada')
                swal({
                    text: "Se ha borrado con exito",
                    icon: "success"
                })
            }
        })
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
                <LinkForm {...{addOrEditLink, currenId, links}} />
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
                                <i className="material-icons" onClick={()=>setcurrenId(link.id)}>create</i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Links;