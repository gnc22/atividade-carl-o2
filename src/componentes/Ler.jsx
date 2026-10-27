import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../config';

function Ler() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        setFilme(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar detalhes do filme:", err);
        setErro(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Carregando dados do filme...</p>;
  }

  if (erro || !filme) {
    return (
      <div className="card-box">
        <div className="alert-error">
          Filme com ID {id} não foi encontrado.
        </div>
        <Link to="/" className="btn btn-secondary">VOLTAR</Link>
      </div>
    );
  }

  return (
    <div className="card-box">
      <h3 style={{ marginBottom: '20px' }}>Detalhes do Filme</h3>
      
      <div className="form-group">
        <p><strong>ID:</strong> {filme.id}</p>
      </div>

      <div className="form-group">
        <p><strong>Nome:</strong> {filme.nome}</p>
      </div>

      <div className="form-group">
        <p><strong>Gênero:</strong> {filme.genero}</p>
      </div>

      <div className="form-group">
        <p><strong>Ano:</strong> {filme.ano}</p>
      </div>

      <div className="btn-container">
        <Link to="/" className="btn btn-secondary">CANCELAR</Link>
      </div>
    </div>
  );
}

export default Ler;
