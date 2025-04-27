// App.js
import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DettagliFilm from './DettagliFilm'; // Import della pagina DettagliFilm

const clientId = '694573141536-tp3qpdtg19e16d4rftikofrr40ovi4sc.apps.googleusercontent.com';
const tmdbApiKey = 'f245ddf2fa039b4ac103b86de1fc2df4';

function App() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [message, setMessage] = useState('');

  const loadWatchlist = (email) => {
    const saved = JSON.parse(localStorage.getItem(`watchlist_${email}`)) || [];
    setWatchlist(saved);
  };

  const saveWatchlist = (email, list) => {
    localStorage.setItem(`watchlist_${email}`, JSON.stringify(list));
  };

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    loadWatchlist(decoded.email);
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  const handleLogout = () => {
    setUser(null);
    setWatchlist([]);
  };

  const handleSearch = async (query) => {
    if (!query) {
      setMovies([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: tmdbApiKey,
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Errore durante la ricerca dei film:', error);
    }

    setIsLoading(false);
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleAddToWatchlist = (movie) => {
    if (user && !watchlist.some((item) => item.id === movie.id)) {
      const updated = [...watchlist, movie];
      setWatchlist(updated);
      saveWatchlist(user.email, updated);
      showMessage('Film aggiunto alla Watchlist!');
    }
  };

  const handleRemoveFromWatchlist = (movieId) => {
    if (user) {
      const updated = watchlist.filter((item) => item.id !== movieId);
      setWatchlist(updated);
      saveWatchlist(user.email, updated);
      showMessage('Film rimosso dalla Watchlist!');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        {message && (
          <Alert variant="success" className="notification">
            {message}
          </Alert>
        )}

        {user && (
          <Button className="logout-button" onClick={handleLogout}>
            <FiLogOut size={20} /> Logout
          </Button>
        )}

        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                    useOneTap
                  />
                </div>
              ) : (
                <Container className="mt-5">
                  <h2 className="welcome-message">Benvenuto in Movie World, {user.name}!</h2>

                  <Row className="my-4">
                    <Col md={8} className="mx-auto">
                      <input
                        type="text"
                        placeholder="Cerca un film..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="form-control"
                      />
                    </Col>
                  </Row>

                  {isLoading && (
                    <div className="text-center">
                      <Spinner animation="border" variant="danger" />
                      <p>Caricamento...</p>
                    </div>
                  )}

                  {movies.length > 0 && (
                    <div>
                      <h3 className="text-center mb-4">Risultati della ricerca</h3>
                      <Row className="justify-content-center">
                        {movies.map((movie) => (
                          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <div className="movie-card">
                              <Link to={`/movie/${movie.id}`}>
                                {movie.poster_path && (
                                  <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                  />
                                )}
                                <div>{movie.title}</div>
                              </Link>
                              {watchlist.some((item) => item.id === movie.id) ? (
                                <Button variant="danger" onClick={() => handleRemoveFromWatchlist(movie.id)} className="mt-2">
                                  Rimuovi dalla Watchlist
                                </Button>
                              ) : (
                                <Button variant="success" onClick={() => handleAddToWatchlist(movie)} className="mt-2">
                                  Aggiungi alla Watchlist
                                </Button>
                              )}
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  {watchlist.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-center mb-4 watchlist-title">La tua Watchlist</h3>
                      <Row className="justify-content-center">
                        {watchlist.map((movie) => (
                          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <div className="movie-card">
                              <Link to={`/movie/${movie.id}`}>
                                {movie.poster_path && (
                                  <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                  />
                                )}
                                <div>{movie.title}</div>
                              </Link>
                              <Button variant="danger" onClick={() => handleRemoveFromWatchlist(movie.id)} className="mt-2">
                                Rimuovi dalla Watchlist
                              </Button>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                </Container>
              )
            }
          />
          <Route path="/movie/:id" element={<DettagliFilm apiKey={tmdbApiKey} />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
