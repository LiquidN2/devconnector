import {
  SET_COMPANY_FILTER,
  SET_LOCATION_FILTER
} from '../constants/searchActionTypes';

export const setCompanyFilter = company => ({
  type: SET_COMPANY_FILTER,
  company
});

export const setLocationFilter = location => ({
  type: SET_LOCATION_FILTER,
  location
});