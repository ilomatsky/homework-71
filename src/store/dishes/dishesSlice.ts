import {Dish} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {deleteDish, fetchDishes} from './dishesThunks';
import {RootState} from '../../app/store';

interface DishesState {
  items: Dish[];
  fetchLoading: boolean;
  deleteLoading: false | string;
}

const initialState: DishesState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: items}) => {
      state.fetchLoading = false;
      state.items = items;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(deleteDish.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
      state.fetchLoading = false;
    });
  }
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectFetchDishLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteLoading;