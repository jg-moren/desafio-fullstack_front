import { apiClient } from './apiClient';

export const Cargos: string[] = ["Cozinheiro", "Programador", "Fazendeiro"];
export const Disponibilidade: string[] = ["Manha", "Tarde"];

export interface Voluntario {
    id:string;
    nome: string;
    email: string;
    telefone:string;
    cargo:string;
    disponibilidade:string;
    status:boolean;
    data_inscricao: Date;
}

interface MongoVoluntario {
  _id: { $oid: string };
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  disponibilidade: string;
  status: boolean;
  data_inscricao: { $date: string };
}

function mapMongoToVoluntario(backendData: MongoVoluntario): Voluntario {
  return {
    id: backendData._id.$oid,
    nome: backendData.nome,
    email: backendData.email,
    telefone: backendData.telefone,
    cargo: backendData.cargo,
    disponibilidade: backendData.disponibilidade,
    status: backendData.status,
    data_inscricao: new Date(backendData.data_inscricao.$date), 
  };
}

export interface Body{
    nome:string;
    email:string;
    telefone:string;
    cargo:string;
    disponibilidade:string;
}

export const volunteersApi = {
    getAll: async (): Promise<Voluntario[]> => {
        const response = await apiClient.get<MongoVoluntario[]>('/voluntarios');
        //console.log(response);
        return response.data.map(mapMongoToVoluntario);
    },

    getById: async (id: string): Promise<Voluntario> => {
        const response = await apiClient.get<MongoVoluntario>(`/voluntarios/${id}`);
        return mapMongoToVoluntario(response.data);
    },

    create: async (data: Body): Promise<boolean> => {
        const response = await apiClient.post('/voluntarios', data);
        return response.status == 200;
    },

    update: async (id: string, data: Body): Promise<boolean> => {
        const response = await apiClient.put(`/voluntarios/${id}`, data);
        return response.status == 200;
    },

    delete: async (id: string): Promise<boolean> => {
        const response = await apiClient.delete(`/voluntarios/${id}`);
        return response.status == 200;
    },};