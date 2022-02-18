import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../Components/Header';
import './Styles/Profile.css';
import perfilbg from './perfilbg.mp4';
import Footer from '../Components/Footer';

function Profile() {
  const history = useHistory();

  const userEmail = JSON.parse(window.localStorage.getItem('user')).email;
  // console.log(userEmail);

  return (
    <div>
      <video
        width="360"
        height="640"
        playsinline
        autoPlay
        muted
        loop
        className="bgVideo"
      >
        <source src={ perfilbg } type="video/mp4" />
      </video>
      <Header title="Perfil" />
      <div className="perfilpage">
        <main className="main-profile">
          <p data-testid="profile-email">{userEmail}</p>
          <Button
            type="button"
            onClick={ () => history.push('/receitas-feitas') }
            data-testid="profile-done-btn"
            className="button-one"
            variant="outline-success"
          >
            Receitas Feitas
          </Button>
          <Button
            type="button"
            onClick={ () => history.push('/receitas-favoritas') }
            data-testid="profile-favorite-btn"
            className="button-two"
            variant="outline-dark"
          >
            Receitas Favoritas
          </Button>
          <Link to="/">
            <Button
              type="button"
              onClick={ () => localStorage.clear() }
              data-testid="profile-logout-btn"
              className="button-three"
              variant="outline-danger"
            >
              Sair
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
