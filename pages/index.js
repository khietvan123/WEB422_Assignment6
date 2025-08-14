/*********************************************************************************
* WEB422 – Assignment 5
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Khiet Van Phan Student ID:147072235  Date: July 24th, 2025
*
********************************************************************************/ 

import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
   <Container>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
        className="mb-4"
        alt="Front facade of the Metropolitan Museum of Art"
      />

      <Row>
        <Col lg={6}>
          <p>
            The <strong>Metropolitan Museum of Art</strong>, colloquially “the
            Met,” is the largest art museum in the United States and one of the
            most visited in the world. Founded in 1870, it aims to bring art and
            art education to the American people. Its permanent collection
            contains more than two million works, divided among seventeen curatorial
            departments.
          </p>
        </Col>
        <Col lg={6}>
          <p>
            The museum’s main building, on the eastern edge of Central Park along
            Manhattan’s Museum Mile, is an iconic landmark. A second location,
            the Met Cloisters, in Upper Manhattan, features art and architecture
            of medieval Europe. For more information, visit&nbsp;
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              the Metropolitan Museum of Art on Wikipedia
            </a>
            .
          </p>
        </Col>
      </Row>
    </Container>
  
  );
}
