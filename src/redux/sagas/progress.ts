import { api } from '../../services';

export const createOrUpdateProgressChain = (payload: any) => {
  return api.post('/progresses', payload);
};
