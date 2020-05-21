import Category from '../../models/Category';
import {
  CATEGORY_FETCH_ALL,
  CATEGORY_SET_DATA,
  CATEGORY_SET_CURRENT,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_ON_PROGRESS,
} from '../actions/types';

export interface CategoryAction {
  type: string;
  category?: Array<Category>;
  categoryId?: any;
}

export function fetchAllCategory(): CategoryAction {
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

export function setCurrentCategory(categoryId: any): CategoryAction {
  return {
    type: CATEGORY_SET_CURRENT,
    categoryId,
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
