import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVolunteers } from '../../hooks/useVolunteers';
import { Form } from '../../components/Form'

export function VolunteerCreate() {
  const { addVolunteer } = useVolunteers();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');

  const submit = async () => {
    console.log({ nome, email, telefone, cargo, disponibilidade });
    await addVolunteer({ nome, email, telefone, cargo, disponibilidade });
    navigate('/');
  };

  return (
    <Form 
      titulo='Novo Voluntario'
      legenda = 'Preencha os dados para cadastrar um novo voluntario'
      nome = {nome}
      email = {email}
      telefone = {telefone}
      cargo = {cargo}
      disponibilidade = {disponibilidade}
      setNome = {setNome}
      setEmail = {setEmail}
      setTelefone = {setTelefone}
      setCargo = {setCargo}
      setDisponibilidade = {setDisponibilidade}
      submit= {submit}
    />
  );
}