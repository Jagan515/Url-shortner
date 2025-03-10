import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5001/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl, customAlias }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setShortUrl(data.shortUrl);
        setQrCode(data.qrCode);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <Card className="p-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter your URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Custom alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Shorten
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {shortUrl && (
        <div className="mt-3 text-center">
          <p>
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </p>
          <img src={qrCode} alt="QR Code" className="img-fluid" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </Card>
  );
}

export default UrlShortener;