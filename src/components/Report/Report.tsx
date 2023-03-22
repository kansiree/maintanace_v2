import React , {  useEffect, useState } from "react";
import DataTable from 'react-data-table-component'
import { Button, Col, Container,Row} from "react-bootstrap";
import { TextField } from '@mui/material';
import ConfigApplication from '../../application.json'


export default function Report(){
    const [dataReport, setDataReport] = useState<string[]>([]);
    const [selectDateFrom,setSelectDateFrom] = React.useState<String>('');
    const [selectDateTo,setSelectDateTo] = React.useState<String>('');
    const URL = (ConfigApplication.developMode==="Y")?ConfigApplication.API_URL_LOCAL:ConfigApplication.API_URL;

    function convertArrayOfObjectsToCSV(array: string[]) :string{
        let result: string;
    
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);
    
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
    
        array.forEach(item => {
            let ctr = 0;
            keys.forEach((key: any) => {
                if (ctr > 0) result += columnDelimiter;
    
                result += item[key];
                
                ctr++;
            });
            result += lineDelimiter;
        });
    
        return result;
    }
    
    function downloadCSV(array: string[]) {
         
        console.log('downloadCSV');
    
        const link = document.createElement('a');
        var csv: string = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;
    
        const filename = 'export.csv';
    
        link.setAttribute('href', "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }
    
    const Export = ({ onExport }:{onExport:any}) => { return (<Button onClick={onExport}>Export</Button>);}
    const data = dataReport;
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(dataReport)} />, [dataReport]) ;
    
        async function fetchData(startDate:String,endDate:String){
            console.log('fetchData Report ');
            console.log("URL: "+URL);
            console.log('startDate: '+startDate)
            console.log('endDate: '+endDate)
         //   urlGetDetail = URL+'/getAllDetail'
            const resAir= await fetch(URL+'/getAllDetail?StartDate='+startDate+'&EndDate='+endDate,{ });
            resAir
            .json()
            .then(res =>  setDataReport(res))
            // .catch(err => setError(err));
        }
        
        useEffect(()=>{
            
         },[])
    
         const search = () => {
            console.log('search');
            console.log(selectDateFrom)
            console.log(selectDateTo)
            if(selectDateFrom){
                console.log('selectDateFrom');
            }
            if(selectDateTo){
                console.log('selectDateTo');
            }
            fetchData(selectDateFrom,selectDateTo);
         }
     
         const columns = [
            {
                name: 'AircraftType',
                selector: (row:any) => row.aircraftType,
            },
            {
                name: 'AircraftSn',
                selector: (row:any) => row.aircraftSn,
            },
            {
                name: 'System',
                selector: (row:any) => row.system,
            },
            {
                name: 'PrimaryPilot',
                selector: (row:any) => row.primaryPilot,
            },
            {
                name: 'SecondaryPilot',
                selector: (row:any) => row.secondaryPilot,
            },
            {
                name: 'Recoder',
                selector: (row:any) => row.recoder,
            },
            {
                name: 'Date',
                selector: (row:any) => row.date,
            },
            {
                name: 'Trouble',
                selector: (row:any) => row.Trouble,
            },
            {
                name: 'TechnicalOrder',
                selector: (row:any) => row.technicalOrder,
            },
            {
                name: 'TroubleShooting',
                selector: (row:any) => row.troubleShooting,
            }, {
                name: 'Replace',
                selector: (row:any) => row.replace,
            },
            {
                name: 'Name',
                selector: (row:any) => row.name,
            },
            {
                name: 'PartNumber',
                selector: (row:any) => row.partNumber,
            },
            {
                name: 'SerailNumberRemove',
                selector: (row:any) => row.serailNumberRemove,
            }, {
                name: 'SerailNumberInstall',
                selector: (row:any) => row.serailNumberInstall,
            },
            {
                name: 'Remark',
                selector: (row:any) => row.remark,
            },
            {
                name: 'imageSerailNumberRemove',
                selector: (row:any) => row.imageSerailNumberRemove,
            },
            {
                name: 'ImageSerailNumberInstall',
                selector: (row:any) => row.ImageSerailNumberInstall,
            },
        ];

    return (
        <Container>
        <Row>
            <Col style={{margin: 10}}>
                <label style={{margin:5}}>
                    Date From
                </label>
                <TextField id="date_from"
                    type="date"
                    onChange={(e) => {
                        setSelectDateFrom(e.target.value)
                      }}>
                </TextField>
            </Col>
            <Col style={{margin: 10}}>
                <label style={{margin: 5}}>
                    Date To
                </label>
                <TextField 
                    id="date_to"
                    type="date"
                    onChange={(e) => {
                        setSelectDateTo(e.target.value)
                      }}>
                </TextField>
            </Col>  
            <Col style={{margin: 10}}>
                <Button id='search' onClick={search}>Search</Button>         
            </Col>
         </Row>
        <DataTable
        actions={actionsMemo} 
            columns={columns}
            data={dataReport}
            
        />
        </Container>
    )
}