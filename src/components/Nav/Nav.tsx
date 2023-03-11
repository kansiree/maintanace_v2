import React from 'react';
import { Container,Nav,Navbar } from 'react-bootstrap';
import Main from '../Main';

export default function NavBarMaintenance(){
    return (
      <Navbar bg="primary" variant="dark">
      <Container>
          <Navbar.Brand href="#home">Maintenance</Navbar.Brand>
          <Nav className="me-auto">
              <Nav.Link href="/addDetail">Add Maintenance Detail</Nav.Link>
              <Nav.Link href="/addMaster">Add Master</Nav.Link>
              <Nav.Link href="/report">Report</Nav.Link>

          </Nav>

      </Container>

  </Navbar>   
  
    )
}