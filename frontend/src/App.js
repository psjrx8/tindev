import React from 'react';
import './App.css';

// import Login from './pages/Login'; //Import componente Login do arquivo Login.js
import Routes from './routes'

function App() { // Componente. Função que retorna um conteúdo html
  return (
    <Routes /> // Encapsulou o componente login presente no arquivo Login.js
  );
}

export default App;
