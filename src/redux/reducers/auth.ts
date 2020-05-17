import { Reducer } from 'redux';
import { AuthAction } from '../actions/auth';

export interface AuthState {
  isAuthenticated: boolean;
  userId: string;
}

const initState = {
  isAuthenticated: true,
  userId: ''
};

const authState: Reducer<AuthState> = (
  state: AuthState = initState,
  action: AuthAction | any
): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authState;
