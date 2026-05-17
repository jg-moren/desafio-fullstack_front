import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVolunteers } from '../../hooks/useVolunteers';
import { Cargos, Disponibilidade } from '../../api/volunteers';
import { Select } from '../../components/Select';
import { Form } from '../../components/Form'
import "./style.css"

export function VolunteerEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVolunteer, editVolunteer } = useVolunteers();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');

  useEffect(() => {
    if (id) {
      getVolunteer(id).then((v) => {
        setNome(v.nome);
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
    <Form 
      titulo='Editar Voluntario'
      legenda = 'Atualize os dados para atualizar o voluntario'
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