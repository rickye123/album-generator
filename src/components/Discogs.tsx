import { useState, useEffect } from 'react';
import { fetchVinylRecords } from '../api/discogsApi';

interface VinylSearchProps {
  albumName: string;
  artistName: string;
}

interface VinylRecord {
  title: string;
  price: number;
  condition: string;
  seller: string;
  uri: string;
}

const Discogs = ({ albumName, artistName }: VinylSearchProps) => {
  const [vinylRecords, setVinylRecords] = useState<VinylRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVinylData = async () => {
      setLoading(true);
      try {
        const records = await fetchVinylRecords(albumName, artistName);
        setVinylRecords(records);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (albumName && artistName) {
      getVinylData();
    }
  }, [albumName, artistName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Cheapest Vinyl Records (VG+ or better) from the UK:</h2>
      {vinylRecords.length > 0 ? (
        <ul>
          {vinylRecords.map((record, index) => (
            <li key={index}>
              <h3>{record.title}</h3>
              <p>Price: £{record.price} GBP</p>
              <p>Condition: {record.condition}</p>
              <p>Seller: {record.seller}</p>
              <a href={record.uri} target="_blank" rel="noopener noreferrer">View Listing</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  );
};

export default Discogs;