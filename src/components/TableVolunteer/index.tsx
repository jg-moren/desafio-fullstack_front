import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVolunteers } from '../../hooks/useVolunteers';
import { Pencil, XCircle } from 'lucide-react';
import "./style.css"

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

  if (loading) return <div className = "loading">Carregando voluntários...</div>;

  return (
    <div className = "table-container">
      <table className="table-custom">
        <thead>
          <tr className="table-lines">
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Disponibilidade</th>
            <th>Status</th>
            <th>Data de Inscrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {volunteers
            .filter((v) => {
              const bateuStatus = status === "" || status === (v.status ? "Ativo" : "Inativo");
              const bateuCargo = cargo === "" || cargo === v.cargo;
              const bateuDispo = disponibilidade === "" || disponibilidade === v.disponibilidade;
              const bateuNome = new RegExp(`^${nome}.*`, 'i').test(v.nome);

              return bateuStatus && bateuCargo && bateuDispo && bateuNome;
            })
            .map((v) => (
              <tr key={v.id} className="table-lines">
                <td className="table-items"><strong>{v.nome}</strong></td>
                <td className="table-items">{v.telefone}</td>
                <td className="table-items">{v.email}</td>
                <td className="table-items">{v.disponibilidade}</td>
                <td className="table-items">
                  {v.status ? (
                    <div className="table-ativo">Ativo</div>
                  ) : (
                    <div className="table-inativo">Inativo</div>
                  )}
                </td>
                <td className="table-items">
                  {v.data_inscricao.getDate()}/{v.data_inscricao.getMonth() + 1}/{v.data_inscricao.getFullYear()}
                </td>
                <td className="table-icons">
                  <button className="icon-button" onClick={() => navigate(`/volunteers/edit/${v.id}`)} style={{ marginLeft: '10px' }}>
                    <Pencil size={18} color="#000" />
                  </button>
                  {v.status && (
                    <button className="icon-button" onClick={() => removeVolunteer(v.id)} style={{ marginLeft: '5px' }}>
                      <XCircle size={20} color="#000" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}