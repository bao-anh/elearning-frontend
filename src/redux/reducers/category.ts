import { Reducer } from 'redux';
import Category from '../../models/Category';
import { CategoryAction } from '../actions/category';
import {
  CATEGORY_SET_DATA,
  CATEGORY_SET_CURRENT,
  CATEGORY_FETCH_ON_PROGRESS,
  CATEGORY_FETCH_SUCCESS,
} from '../actions/types';

export interface CategoryState {
  isLoading: boolean;
  data: Array<Category>;
  error: string;
  current?: any;
}

const initState = {
  isLoading: true,
  data: [],
  error: '',
  current: 'all',
};

const categoryState: Reducer<CategoryState> = (
  state: CategoryState = initState,
  action: CategoryAction | any
): CategoryState => {
  switch (action.type) {
    case CATEGORY_SET_DATA: {
      return {
        ...state,
        data: action.category,
      };
    }
    case CATEGORY_SET_CURRENT: {
      return {
        ...state,
        current: action.categoryId,
      };
    }
    case CATEGORY_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case CATEGORY_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};

export default categoryState;
