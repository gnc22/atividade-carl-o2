import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';

function Criar() {
  const [values, setValues] = useState({
    nome: '',
    genero: '',
    ano: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(API_URL, values)
      .then(res => {
        console.log("Filme criado com sucesso:", res.data);
        navigate('/');
      })
      .catch(err => console.error("Erro ao criar filme:", err));
  };

  return (
    <div className="card-box">
      <h3 style={{ marginBottom: '20px' }}>Cadastrar Novo Filme</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Filme:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-control"
            placeholder="Digite o nome do filme"
            required
            value={values.nome}
            onChange={e => setValues({ ...values, nome: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genero">Gênero:</label>
          <input
            type="text"
            id="genero"
            name="genero"
            className="form-control"
            placeholder="Digite o gênero (ex: Ação, Drama, Sci-Fi)"
            required
            value={values.genero}
            onChange={e => setValues({ ...values, genero: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ano">Ano de Lançamento:</label>
          <input
            type="text"
            id="ano"
            name="ano"
            className="form-control"
            placeholder="Digite o ano (ex: 2024)"
            required
            value={values.ano}
            onChange={e => setValues({ ...values, ano: e.target.value })}
          />
        </div>

        <div className="btn-container">
          <button type="submit" className="btn btn-primary">CRIAR</button>
          <Link to="/" className="btn btn-secondary">CANCELAR</Link>
        </div>
      </form>
    </div>
  );
}

export default Criar;
