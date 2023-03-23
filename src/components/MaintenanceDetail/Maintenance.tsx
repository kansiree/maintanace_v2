import React , {  useEffect,useRef, useState }from 'react';
import { Container,Row,Col,Button} from "react-bootstrap";
import InputText from '../InputText'
import  Select  from 'react-select';
import TextField from '@mui/material/TextField'
import ConfigApplication from '../../application.json'
import '../MaintenanceDetail/Maintenance.css'

export default function MaintenanceDetail(){

    const URL = (ConfigApplication.developMode=="Y")?ConfigApplication.API_URL_LOCAL:ConfigApplication.API_URL;
    const [error, setError] = useState(false);
    // const [isLoaded, setIsLoaded] = this.useState(false);
    const [itemsAir, setItemsAir] = useState([]);
    const [itemsSystem, setItemsSystem] = useState([]);
    const [itemsTechnicalOrder, setItemsTechnicalOrder] = useState([]);
    const [selectedOptionsAirCraft,setSelectedOptionsAirCraft] = React.useState<any>();
    const [selectedOptionsAirCraftSN,setSelectedOptionsAirCraftSN] = React.useState();
    const [selectedOptionsSystem,setSelectedOptionsSystem] = React.useState<any>();
    const [selectedOptionsTrouble,setSelectedOptionsTrouble] = React.useState();
    const [selectedOptionsTechnical,setSelectedOptionsTechnical] = React.useState<any>();
    const [selectedOptionsTrobleShoot,setSelectedOptionsTrobleShoot] = React.useState();
    const [selectDate,setSelectDate] = React.useState<string>();
     // Function triggered on selection
     function handleSelectAircraft(data:any) {
      setSelectedOptionsAirCraft(data);
    }
     function handleSelectAircraftSN(data:any) {
      setSelectedOptionsAirCraftSN(data);
    }
    function handleSelectSystem(data:any) {
      setSelectedOptionsSystem(data);
    } 
    function handleSelectTrouble(data:any) {
      setSelectedOptionsTrouble(data);
    } 
    function handleSelectTechnical(data:any) {
      setSelectedOptionsTechnical(data);
    }
    function handleSelectTrobleShoot(data:any) {
      setSelectedOptionsTrobleShoot(data);
    }
  
    async function fetchData(){
      console.log("fetchData")
      console.log("url: "+URL);
      const resAir= await fetch(URL+'/getMaster?type=aircraft',{
         method: 'GET',  
       });
       resAir
       .json()
       .then(res =>  setItemsAir(res.map((item: any) => ({value:item.fullName ,label:item.fullName}))))
       .catch(err => setError(err));
  
       const resTechnicalOrder = await fetch(URL+'/getMaster?type=technical',{
        method: 'GET'
      });
       resTechnicalOrder
       .json()
       .then(res =>  setItemsTechnicalOrder(res.map((item: any) => ({value:item.fullName ,label:item.fullName}))))
       .catch(err => setError(err));
  
       const resSystem = await fetch(URL+'/getMaster?type=system',{
        method: 'GET'
      });
       resSystem
       .json()
       .then(res => setItemsSystem(res.map((item: any) => ({value:item.fullName ,label:item.fullName})))) //  
       .catch(err => setError(err));
  
    }
  
    useEffect(()=>{
       fetchData();
    },[])
  
  const btSave = React.useRef<HTMLButtonElement>(null);
  const primaryPilot = React.createRef<any>();
  const second2Pilot = React.createRef<any>();
  const remark = React.createRef<any>();
  const recoder = React.createRef<any>();
  const replace = React.createRef<any>();
  const name = React.createRef<any>();
  const pathNumber = React.createRef<any>();
  const serailNumberRemove = React.createRef<any>();
  const serailNumberInstall = React.createRef<any>();
  const aircraftSN = React.createRef<any>();
  const trouble = React.createRef<any>();
  const troubleShooting = React.createRef<any>();
  
  const onClickSave = () => {
        console.log('onClickSave') 
  
        if(undefined == selectedOptionsAirCraft){
          alert('Please select aircraft type.')
        }else if(aircraftSN.current.value.length <= 0){
          alert('Please key aircraft S/N')
        }else{
  
          const data = { 
            aircraftType: selectedOptionsAirCraft.value,
            aircraftSN : aircraftSN.current.value,
            system : selectedOptionsSystem.value,
            primaryPilot: primaryPilot.current.value,
            secondaryPilot: second2Pilot.current.value,
            recoder: recoder.current.value,
            date : selectDate,
            trouble: trouble.current.value,
            technicalOrder:selectedOptionsTechnical.value,
            troubleShooting:troubleShooting.current.value,
            replace:replace.current.value,
            name:name.current.value,
            partNumber:pathNumber.current.value,
            serailNumberRemove:serailNumberRemove.current.value,
            serailNumberInstall:serailNumberInstall.current.value,
            remark:remark.current.value,
            imageSerailNumberRemove:"",
            imageSerailNumberInstall:""
          }
          console.log('data: '+ JSON.stringify(data));
          fetch(URL+'/createDetail', {
            method: 'POST',
            body: JSON.stringify(data),
          })
          .then(res => setTimeout(() => {
            window.location.reload();
          }, 200))   
          .then(res => alert('SAVE SUCCESS'))
  
        }
     
  }

    return (
        
    <Container>
    <Row style={{margin: 10}}>
      <Col>Aircraft Type </Col>
      <Col>  
          <Select
            options={itemsAir}
            placeholder="Select Aircraft Type"
            value={selectedOptionsAirCraft}
            isSearchable={true}
            onChange={handleSelectAircraft}
          />
       </Col>
    </Row>
    <Row style={{margin: 10}}>
      <Col>Aircraft S/N </Col>
      <Col>  
      <InputText textPlaceHolder = "Aircraft S/N" ref={aircraftSN}  ></InputText>  
      </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>System </Col>
      <Col>    
          <Select
            options={itemsSystem}
            placeholder="Select System"
            value={selectedOptionsSystem}
            isSearchable={true}
            onChange={handleSelectSystem}
          />         
       </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Pilot 1 </Col>
      <Col>    <InputText textPlaceHolder = "Pilot 1" ref={primaryPilot}  ></InputText>    </Col>
    </Row>
    <Row style={{margin: 10}}>
      <Col>Pilot 2 </Col>
      <Col>    <InputText textPlaceHolder = "Pilot 2" ref={second2Pilot}></InputText>    </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Recorder </Col>
      <Col>    <InputText textPlaceHolder="Recoder" ref={recoder}> </InputText>    </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Date </Col>
      <Col>
         <TextField
        id="date"
        label="date"
        type="date"
        onChange={(e) => {
          setSelectDate(e.target.value)
        }}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> 
      </Col>
     
    </Row>
    <Row style={{margin: 10}}>
      <Col>Trouble </Col>
      <Col>   
      <InputText textPlaceHolder="Trouble" ref={trouble}></InputText>
      </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Technical Order </Col>
      <Col>
          <Select
            options={itemsTechnicalOrder}
            placeholder="Select Technical Order"
            value={selectedOptionsTechnical}
            isSearchable={true}
            onChange={handleSelectTechnical}
          />     
      </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Trouble Shooting  </Col>
      <Col>    
      <InputText textPlaceHolder = "Trouble Shooting" ref={troubleShooting}></InputText>
          </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Replace </Col>
      <Col>    <InputText textPlaceHolder = "Replace" ref={replace} ></InputText>    </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Name </Col>
      <Col>    <InputText textPlaceHolder = "Name" ref={name} ></InputText>    </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Path Number </Col>
      <Col>    <InputText textPlaceHolder = "Path Number" ref={pathNumber}></InputText>    </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Serial number Remove </Col>
      <Col>    <InputText textPlaceHolder = "Serial number Remove" ref={serailNumberRemove}></InputText>    </Col>
    </Row>
    <Row style={{margin: 10}} >
      <Col>Serial number install </Col>
      <Col>    <InputText textPlaceHolder = "Serial number install" ref={serailNumberInstall}></InputText>    </Col>
    </Row>
    <Row style={{margin: 10}}>
      <Col>Remark </Col>
      <Col>    <InputText textPlaceHolder = "Remark" ref={remark}></InputText>    </Col>
    </Row>
    
      <Button variant="primary" type="submit" ref={btSave} style={{marginTop:10}} onClick={onClickSave}>Save</Button>  

  </Container>

    )
}