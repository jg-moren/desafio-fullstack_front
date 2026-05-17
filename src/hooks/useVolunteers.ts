import { useState, useCallback } from 'react';
import { volunteersApi, type Voluntario, type Body } from '../api/volunteers';

export function useVolunteers() {
  const [volunteers, setVolunteers] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVolunteers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await volunteersApi.getAll();
      setVolunteers(data);
    } catch (error) {
      console.error('Erro ao buscar voluntários:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getVolunteer = async (id: string) => {
    return await volunteersApi.getById(id);
  };

  const addVolunteer = async (data: Body) => {
    console.log(await volunteersApi.create(data));
  };

  const editVolunteer = async (id: string, data: Body) => {
    await volunteersApi.update(id, data);
  };

  const removeVolunteer = async (id: string) => {
    
    await volunteersApi.delete(id);
  };

  return {
    volunteers,
    loading,
    fetchVolunteers,
    getVolunteer,
    addVolunteer,
    editVolunteer,
    removeVolunteer,
  };
}