import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { favouritesAtom } from '@/store';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList.includes(objectID));
  }, [favouritesList, objectID]);

  function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(current => current.filter(fav => fav !== objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }
  }

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const image = data.primaryImage;
  const title = data.title || 'N/A';
  const date = data.objectDate || 'N/A';
  const classification = data.classification || 'N/A';
  const medium = data.medium || 'N/A';
  const artist = data.artistDisplayName || 'N/A';
  const credit = data.creditLine || 'N/A';
  const dims = data.dimensions || 'N/A';

  return (
    <Card className="mb-4">
      {image && <Card.Img variant="top" src={image} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {date}<br />
          <strong>Classification:</strong> {classification}<br />
          <strong>Medium:</strong> {medium}<br /><br />
          <strong>Artist:</strong> {artist}
          {data.artistWikidata_URL && (
            <> <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a></>
          )}
          <br />
          <strong>Credit Line:</strong> {credit}<br />
          <strong>Dimensions:</strong> {dims}
        </Card.Text>
        <Button
          variant={showAdded ? 'primary' : 'outline-primary'}
          onClick={favouritesClicked}
        >
          {showAdded ? '+ Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
}
