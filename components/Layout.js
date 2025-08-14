/*********************************************************************************
* WEB422 – Assignment 4
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Khiet Van Phan Student ID:147072235  Date: July 4th, 2025
*
********************************************************************************/ 

import MainNav from './MainNav';
import { Container } from 'react-bootstrap';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <br />
      <Container className="mt-5">
        {children}
      </Container>
      <br/>
    </>
  );
}