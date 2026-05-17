import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVolunteers } from '../../hooks/useVolunteers';
import { XCircle } from 'lucide-react';

interface TableVolunteerProps {
  nome:string;
  status:string;
  cargo:string;
  disponibilidade:string;
}

export function TableVolunteer({nome, status, cargo, disponibilidade} : TableVolunteerProps) {
  const { volunteers, loading, fetchVolunteers, removeVolunteer } = useVolunteers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);

  if (loading) return <p>Carregando voluntários...</p>;

  return (
    <div>
      <ul>
        {volunteers.map((v) => (
          (status == "" || status == (v.status ? "Ativo" : "Inativo")) &&
          (cargo == "" || cargo == (v.cargo)) &&
          (disponibilidade == "" || disponibilidade == (v.disponibilidade)) &&
          RegExp(`^${nome}.*`, 'i').test(v.nome)
          
        ) ? (
          <li key={v.id} style={{ margin: '10px 0' }}>
            <strong>{v.nome}</strong> ({v.email})
            <button className = "icon-button" onClick={() => navigate(`/volunteers/edit/${v.id}`)} style={{ marginLeft: '10px' }}>
              Editar
            </button >
            {(v.status) ? <button className = "icon-button" onClick={() => removeVolunteer(v.id)} style={{ marginLeft: '5px', color: 'red' }}>
              <XCircle size={20} color="#000" />
            </button> : <div/>}
          </li>
        ):<div/>)}
      </ul>
    </div>
  );
}