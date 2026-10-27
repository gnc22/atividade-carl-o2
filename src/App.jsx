import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cabecalho from './componentes/Cabecalho';
import Inicio from './componentes/Inicio';
import Ler from './componentes/Ler';
import Criar from './componentes/Criar';
import Alterar from './componentes/Alterar';
import Apagar from './componentes/Apagar';

function App() {
  return (
    <BrowserRouter>
      <Cabecalho />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/ler/:id" element={<Ler />} />
        <Route path="/criar" element={<Criar />} />
        <Route path="/alterar" element={<Alterar />} />
        <Route path="/apagar" element={<Apagar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
