import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableVolunteer } from '../../components/TableVolunteer'
import { Cargos, Disponibilidade } from '../../api/volunteers';
import { Select } from '../../components/Select';
import { Plus } from 'lucide-react';
import "./style.css"

export function VolunteersList() {
  const navigate = useNavigate();

  const [nome, setName] = useState('');
  const [cargo, setCargo] = useState('');
  const [status, setStatus] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');


  return (
    <div>
      <div className = "page">
        <div className='titulo'>
          <div>
            <h1>Gerenciamento de Voluntários</h1>
            <h4>Gerencie cadastros, vizualize informações e acompanhe voluntários</h4>
          </div>
          <div>
            <button className = "text-button" onClick={() => navigate('/volunteers/create')}> <Plus size={24} color="#fff" /> Novo Voluntário </button>
          </div>
          
        </div>
        <div className = "filter">
          <input placeholder="Nome" value={nome} onChange={(e) => setName(e.target.value)} required />
          <Select texto = "Todos os Status" valor = {status} setValor = {setStatus} opcoes={["Ativo", "Inativo"]}></Select>
          <Select texto = "Todos os Cargos" valor = {cargo} setValor = {setCargo} opcoes={Cargos}></Select>
          <Select texto = "Todas as Disponibilidade" valor = {disponibilidade} setValor = {setDisponibilidade} opcoes={Disponibilidade}></Select>
        
        </div>

      </div>
      <TableVolunteer
        nome = {nome} cargo={cargo} status={status} disponibilidade={disponibilidade}
      />
    </div>
  );
}