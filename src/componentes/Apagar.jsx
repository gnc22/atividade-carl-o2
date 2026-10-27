import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';

function Apagar() {
  const [buscaId, setBuscaId] = useState('');
  const [statusBusca, setStatusBusca] = useState('inicial');
  const [filme, setFilme] = useState(null);

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

  const handleDelete = () => {
    if (!filme) return;

    const confirm = window.confirm(`Deseja realmente apagar o filme "${filme.nome}"?`);
    if (confirm) {
      axios.delete(`${API_URL}/${filme.id}`)
        .then(() => {
          console.log("Filme apagado com sucesso!");
          navigate('/');
        })
        .catch(err => console.error("Erro ao apagar filme:", err));
    }
  };

  return (
    <div className="card-box">
      <h3 style={{ marginBottom: '20px' }}>Apagar Filme</h3>

      {statusBusca === 'inicial' && (
        <form onSubmit={handleBuscar}>
          <div className="form-group">
            <label htmlFor="buscaId">Digite o ID do Filme que deseja apagar:</label>
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

      {statusBusca === 'encontrado' && filme && (
        <div>
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
            <button onClick={handleDelete} className="btn btn-danger">APAGAR</button>
            <Link to="/" className="btn btn-secondary">CANCELAR</Link>
          </div>
        </div>
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

export default Apagar;
