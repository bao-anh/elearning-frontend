import Category from '../../models/Category';
import {
  CATEGORY_FETCH_ALL,
  CATEGORY_SET_DATA,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_ON_PROGRESS,
} from '../actions/types';

export interface CategoryAction {
  type: string;
  category?: Array<Category>;
}

export function fetchCategory(): CategoryAction {
  return {
    type: CATEGORY_FETCH_ALL,
  };
}

export function setCategory(category: any): CategoryAction {
  return {
    type: CATEGORY_SET_DATA,
    category,
  };
}

export function fetchCategorySuccess(): CategoryAction {
  return {
    type: CATEGORY_FETCH_SUCCESS,
  };
}

export function fetchCategoryOnProgress(): CategoryAction {
  return {
    type: CATEGORY_FETCH_ON_PROGRESS,
  };
}
