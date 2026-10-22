import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './app/store';
import { Layout } from './app/Layout';
import { Shop } from './features/Shop';
import { Checkout } from './features/Checkout';
import { Experiences, Dashboard } from './features/Discover';
import { Community, Activity } from './features/Social';
import { Advice, Register } from './features/Account';
import { Link } from 'react-router-dom';
import './styles/index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Shop />} />
            <Route path="experiencias" element={<Experiences />} />
            <Route path="pedido" element={<Checkout />} />
            <Route path="resumen" element={<Dashboard />} />
            <Route path="comunidad" element={<Community />} />
            <Route path="actividad" element={<Activity />} />
            <Route path="asesoria" element={<Advice />} />
            <Route path="registro" element={<Register />} />
            <Route
              path="*"
              element={
                <div className="empty">
                  <h1>Este camino no lleva al café.</h1>
                  <Link className="button" to="/">
                    Volver al inicio
                  </Link>
                </div>
              }
            />
          </Route>
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
