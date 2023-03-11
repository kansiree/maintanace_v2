import React from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import ConfigApplication from '../../../application.json'

export default function AddMaster() {
    const type = React.useRef();
    const detail = React.useRef();
    const btSave = React.useRef();
   // const URL = (ConfigApplication.developMode=="Y")?ConfigApplication.API_URL_LOCAL:ConfigApplication.API_URL;
    console.log("URL: "+URL);
   
    return(
            <Container>
                Add Master
            </Container>
    )
    
}