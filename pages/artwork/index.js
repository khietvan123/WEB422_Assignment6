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
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Error from 'next/error';
import ArtworkCard from '@/components/ArtworkCard';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) setPage(page - 1);
  }

  function nextPage() {
    if (artworkList && page < artworkList.length) setPage(page + 1);
  }

  useEffect(() => {
    if (!data) return;
    if (data.objectIDs && data.objectIDs.length > 0) {
      const results = [];
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs.includes(x));
      for(let i = 0 ; i < filteredResults.length; i += PER_PAGE) {
        results.push(filteredResults.slice(i, i + PER_PAGE));
      }
      setArtworkList(results);
    } else {
      setArtworkList([]);
    }
    setPage(1);
  }, [data]);

  if (error) return <Error statusCode={404} />;
  if (artworkList === null) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((objID) => (
            <Col lg={3} key={objID}>
              <ArtworkCard objectID={objID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row className="justify-content-center mt-4">
          <Col md="auto">
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={page <= 1} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next
                onClick={nextPage}
                disabled={page >= artworkList.length}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}