import { useNavigate } from 'react-router-dom';
import { Cargos, Disponibilidade } from '../../api/volunteers';
import { Select } from '../../components/Select';
import { ArrowLeft } from 'lucide-react';
import "./style.css"

interface FormProps {
    titulo: string;
    legenda: string;
    nome: string; 
    email: string; 
    telefone: string; 
    cargo: string; 
    disponibilidade: string; 
    setNome: (novoValor: string) => void; 
    setEmail: (novoValor: string) => void; 
    setTelefone: (novoValor: string) => void; 
    setCargo: (novoValor: string) => void; 
    setDisponibilidade: (novoValor: string) => void; 
    submit: () => void; 
}

export function Form(
    {
        titulo,
        legenda,
        nome,
        email,
        telefone,
        cargo,
        disponibilidade,
        setNome,
        setEmail,
        setTelefone,
        setCargo,
        setDisponibilidade,
        submit
    }:FormProps

) {
    
  const navigate = useNavigate();

  return (
    <div className = "page">
      <button className = "form-return"
        onClick={() => navigate('/')} 
      >
        <ArrowLeft size={20} color="#555" />
        Voltar para lista
      </button>
      <div className = "form-container">
        <h1>{titulo}</h1>
        <h4>{legenda}</h4>
        <div className = "form-split">
          <div className = "form-input">
            <label>Nome*</label>
            <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className = "form-input">
            <label>E-mail*</label>
            <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className = "form-input">
            <label>Telefone*</label>
            <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          </div>
          <div className = "form-input">
            <label>Cargo*</label>
            <Select texto = "Selecione um Cargo" valor = {cargo} setValor = {setCargo} opcoes={Cargos}></Select>
          </div>  
          <div className = "form-input">
            <label>Disponibilidade*</label>
            <Select texto = "Selecione uma Disponibilidade" valor = {disponibilidade} setValor = {setDisponibilidade} opcoes={Disponibilidade}></Select>  
          </div>
        </div>
        <div className = "form-button">
          <div>
            <button className = "cancelar-button" onClick={() => navigate('/')}>Cancelar</button>
          </div>
          <div>
            <button className = "text-button" onClick={submit} >Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}