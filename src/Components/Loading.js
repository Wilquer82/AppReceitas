import React from 'react';
import './Loading.css';
/* c-loader créditos para https://desenvolvimentoparaweb.com/css/animacao-loading-css/ */

function Loading() {
  return (
    <main className="main-loading">
      <div className="c-loader" />
      <p className="loading">... Loading</p>
    </main>
  );
}

export default Loading;
