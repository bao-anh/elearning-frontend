import Auth from '../../models/Auth';
import { AUTH_LOGIN } from '../actions/types';

export interface AuthAction {
  type: string;
  category?: Array<Auth>;
}

export function login(): AuthAction {
  return {
    type: AUTH_LOGIN
  };
}
