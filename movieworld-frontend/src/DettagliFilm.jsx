// DettagliFilm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spinner, Button } from 'react-bootstrap';

const DettagliFilm = ({ apiKey }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const [filmRes, videosRes, creditsRes, imagesRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=it-IT`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=it-IT`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=it-IT`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`),
        ]);

        setFilm(filmRes.data);

        // Prendo il primo trailer da YouTube
        const trailer = videosRes.data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
        setTrailerKey(trailer?.key || null);

        // Cast principali (primi 5)
        setCast(creditsRes.data.cast.slice(0, 5));

        // Foto backdrop principali (primi 5)
        setImages(imagesRes.data.backdrops.slice(0, 5));
      } catch (error) {
        console.error('Errore nel caricamento dei dettagli:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmData();
  }, [id, apiKey]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (!film) {
    return <p>Film non trovato.</p>;
  }

  return (
    <div className="container py-4">
      <Button variant="warning" className="mb-4" onClick={() => navigate('/')}>← Torna indietro</Button>

      <Card style={{ backgroundColor: '#1e1e1e', color: '#fff', borderRadius: '20px', padding: '20px' }}>
        <Card.Body>
          <div className="row">
            <div className="col-md-4">
              <Card.Img 
                src={film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : 'https://via.placeholder.com/400x600?text=Nessuna+Immagine'} 
                alt={film.title} 
                style={{ borderRadius: '15px', marginBottom: '20px' }}
              />
            </div>
            <div className="col-md-8">
              <h2 style={{ color: '#ffcc00' }}>{film.title}</h2>
              <p><strong>Anno:</strong> {film.release_date?.split('-')[0]}</p>
              <p><strong>Descrizione:</strong> {film.overview || 'Nessuna descrizione disponibile.'}</p>

              {trailerKey && (
                <div className="my-4">
                  <h5>Trailer:</h5>
                  <div className="ratio ratio-16x9">
                    <iframe 
                      src={`https://www.youtube.com/embed/${trailerKey}`} 
                      title="Trailer" 
                      allowFullScreen 
                    />
                  </div>
                </div>
              )}

              {cast.length > 0 && (
                <div className="my-4">
                  <h5>Cast principale:</h5>
                  <ul>
                    {cast.map(actor => (
                      <li key={actor.id}>
                        {actor.name} - <i>{actor.character}</i>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {images.length > 0 && (
                <div className="my-4">
                  <h5>Foto del film:</h5>
                  <div className="d-flex overflow-auto" style={{ gap: '10px' }}>
                    {images.map((img, index) => (
                      <img 
                        key={index}
                        src={`https://image.tmdb.org/t/p/w300${img.file_path}`} 
                        alt="Backdrop" 
                        style={{ borderRadius: '10px', height: '150px' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DettagliFilm;
