import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { VolunteersList } from './pages/VolunteersList';
import { VolunteerCreate } from './pages/VolunteerCreate';
import { VolunteerEdit } from './pages/VolunteerEdit';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/volunteers" element={<VolunteersList />} />
          <Route path="/volunteers/create" element={<VolunteerCreate />} />
          <Route path="/volunteers/edit/:id" element={<VolunteerEdit />} />
          
          {/* Redireciona rota raiz para a listagem */}
          <Route path="/" element={<Navigate to="/volunteers" replace />} />
          <Route path="*" element={<h2>404 - Não Encontrado</h2>} />
        </Routes>
    </BrowserRouter>
  );
}