import { Container,Nav,Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBarMaintenance(){
    return (
     
      <Navbar bg="primary" variant="dark">
      <Container>
          <Navbar.Brand href="#home">Maintenance</Navbar.Brand>
          <Nav className="me-auto">
              <Link to="addDetail"></Link>
              <Link to="addMaster"></Link>
              <Link to="report"></Link>
              <Nav.Link href="#/addDetail">Add Maintenance Detail</Nav.Link>
              <Nav.Link href="#/addMaster">Add Master</Nav.Link>
              <Nav.Link href="#/report">Report</Nav.Link>
          </Nav>

      </Container>

  </Navbar>   
  
    )
}