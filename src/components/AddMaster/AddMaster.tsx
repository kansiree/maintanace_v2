import React from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import ConfigApplication from '../../application.json'
export default function AddMaster() {

    const URL = (ConfigApplication.developMode==="Y")?ConfigApplication.API_URL_LOCAL:ConfigApplication.API_URL;
   
    const type = React.useRef<HTMLSelectElement>(null);
    const detail = React.useRef<HTMLTextAreaElement>(null);
    const btSave = React.useRef<HTMLButtonElement>(null);

    const onClickSave = () =>{
        let valueType = type.current?.value
        let valueDetail = detail.current?.value
        const data = { type: valueType,
        fullName: valueDetail}
        if(data.fullName==''){
            alert('please key detail.');
        }else if(data.type=='-1'){
            alert('please select type.');
    
        }else{
    
            fetch(URL+'/createMaster',{
                method: 'POST',
                mode:'no-cors',
                body: JSON.stringify(data)
            }).then(res => alert('Save Success'))
        }
    }

    return(
        <Form>
            <Container>
                <FloatingLabel controlId="floatingSelect" label="Select Type" >
                    <Form.Select  ref={type}>
                        <option value="-1">Select Type</option>
                        <option value="system">System</option>
                        <option value="aircraft">Aircraft</option>
                        <option value="technical">Technical</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingText" label="Detail" style={{marginTop:10}}>
                    <Form.Control as="textarea"  ref={detail}>
                        
                    </Form.Control>
                </FloatingLabel>
                <Button variant="primary" type="submit" ref={btSave} style={{marginTop:10}}
                onClick={onClickSave}
                >SAVE</Button>
            </Container>
        </Form>
    )
    
}