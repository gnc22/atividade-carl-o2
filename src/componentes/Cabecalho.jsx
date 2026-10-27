import React from 'react';
import { Link } from 'react-router-dom';
import './Cabecalho.css';

function Cabecalho() {
  return (
    <header className="cabecalho-container">
      <h2>CATÁLOGO DE FILMES</h2>
      <ul className="menu-lista">
        <li><Link to="/">INÍCIO</Link></li>
        <li><Link to="/criar">CRIAR</Link></li>
        <li><Link to="/alterar">ALTERAR</Link></li>
        <li><Link to="/apagar">APAGAR</Link></li>
      </ul>
    </header>
  );
}

export default Cabecalho;
