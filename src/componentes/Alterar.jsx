import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';

function Alterar() {
  const [buscaId, setBuscaId] = useState('');
  const [statusBusca, setStatusBusca] = useState('inicial');
  const [filme, setFilme] = useState({
    id: '',
    nome: '',
    genero: '',
    ano: ''
  });

  const navigate = useNavigate();

  const handleBuscar = (event) => {
    event.preventDefault();
    if (!buscaId.trim()) return;

    axios.get(`${API_URL}/${buscaId.trim()}`)
      .then(res => {
        setFilme(res.data);
        setStatusBusca('encontrado');
      })
      .catch(err => {
        console.error("Filme não encontrado:", err);
        setStatusBusca('nao_encontrado');
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`${API_URL}/${filme.id}`, filme)
      .then(res => {
        console.log("Filme atualizado com sucesso:", res.data);
        navigate('/');
      })
      .catch(err => console.error("Erro ao alterar filme:", err));
  };

  return (
    <div className="card-box">
      <h3 style={{ marginBottom: '20px' }}>Alterar Filme</h3>

      {statusBusca === 'inicial' && (
        <form onSubmit={handleBuscar}>
          <div className="form-group">
            <label htmlFor="buscaId">Digite o ID do Filme:</label>
            <input
              type="text"
              id="buscaId"
              className="form-control"
              placeholder="Ex: 1"
              value={buscaId}
              onChange={e => setBuscaId(e.target.value)}
              required
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn btn-primary">PROCURA</button>
            <Link to="/" className="btn btn-secondary">CANCELAR</Link>
          </div>
        </form>
      )}

      {statusBusca === 'encontrado' && (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>ID:</label>
            <input
              type="text"
              className="form-control"
              value={filme.id}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="nome">Nome do Filme:</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              value={filme.nome}
              onChange={e => setFilme({ ...filme, nome: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genero">Gênero:</label>
            <input
              type="text"
              id="genero"
              className="form-control"
              value={filme.genero}
              onChange={e => setFilme({ ...filme, genero: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ano">Ano:</label>
            <input
              type="text"
              id="ano"
              className="form-control"
              value={filme.ano}
              onChange={e => setFilme({ ...filme, ano: e.target.value })}
              required
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn btn-primary">ALTERA</button>
            <Link to="/" className="btn btn-secondary">CANCELAR</Link>
          </div>
        </form>
      )}

      {statusBusca === 'nao_encontrado' && (
        <div>
          <div className="alert-error">
            Filme com ID "{buscaId}" não foi localizado na base de dados!
          </div>
          <div className="btn-container">
            <button onClick={() => setStatusBusca('inicial')} className="btn btn-primary">TENTAR NOVAMENTE</button>
            <Link to="/" className="btn btn-secondary">VOLTAR AO INÍCIO</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alterar;
