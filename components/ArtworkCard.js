import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error){
    return <Error statusCode={404} />;
    }
    
  if (!data){ 
        return null;
    }

  const image = data.primaryImageSmall
    ? data.primaryImageSmall
    : 'https://placehold.co/375x375?text=Not+Available';

  const title = data.title || 'N/A';
  const date = data.objectDate || 'N/A';
  const classification = data.classification || 'N/A';
  const medium = data.medium || 'N/A';

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {date}
          <br />
          <strong>Classification:</strong> {classification}
          <br />
          <strong>Medium:</strong> {medium}
        </Card.Text>

        <Link href={`/artwork/${objectID}`} legacyBehavior passHref>
          <Button variant="dark">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}