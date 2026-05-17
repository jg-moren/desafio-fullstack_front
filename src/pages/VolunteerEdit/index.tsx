import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVolunteers } from '../../hooks/useVolunteers';
import { Cargos, Disponibilidade } from '../../api/volunteers';
import { Select } from '../../components/Select';
import "./style.css"

export function VolunteerEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVolunteer, editVolunteer } = useVolunteers();

  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');

  useEffect(() => {
    if (id) {
      getVolunteer(id).then((v) => {
        setName(v.nome);
        setEmail(v.email);
        setTelefone(v.telefone);
        setCargo(v.cargo);
        setDisponibilidade(v.disponibilidade);
      }).catch(() => navigate('/'));
    }
  }, [id]);


  const submit = async () => {
    if (id) {
      console.log({ nome, email, telefone, cargo, disponibilidade });
      await editVolunteer(id, { nome, email, telefone, cargo, disponibilidade });
      navigate('/');
    }
  };


  return (
    <div>


      <h2>Cadastrar Voluntário</h2>
      <input placeholder="Nome" value={nome} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
      <input placeholder="Disponibilidade" value={disponibilidade} onChange={(e) => setDisponibilidade(e.target.value)} required />
      <Select texto = "Selecione um Cargo" valor = {cargo} setValor = {setCargo} opcoes={Cargos}></Select>
      <Select texto = "Selecione uma Disponibilidade" valor = {disponibilidade} setValor = {setDisponibilidade} opcoes={Disponibilidade}></Select>
      <button onClick={submit} >Salvar</button>
      <button onClick={() => navigate('/')}>Cancelar</button>
    </div>
  );
}