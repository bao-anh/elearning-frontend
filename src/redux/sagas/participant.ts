import { api } from '../../services';

export const getParticipantSubmitAssignment = (payload: any) => {
  return api.post('/participants', payload);
};
