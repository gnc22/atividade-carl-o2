import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

function Inicio() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setFilmes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar filmes:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Carregando filmes...</p>
      ) : filmes.length === 0 ? (
        <div className="card-box">
          <p>Nenhum filme cadastrado no momento.</p>
        </div>
      ) : (
        filmes.map((filme) => (
          <Link to={`/ler/${filme.id}`} key={filme.id} className="item-filme">
            <div>
              <strong>Id: {filme.id}</strong>
            </div>
            <div>
              <strong>Nome: {filme.nome}</strong>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Inicio;
