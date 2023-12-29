import {CartDish, Dish} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

interface CartState {
  cartDishes: CartDish[];
}

const initialState: CartState = {
  cartDishes: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);

      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          amount: 1,
          dish,
        });
      }
    },
    updateCart: (state, {payload: dishes}: PayloadAction<Dish[]>) => {
      const newCartDishes: CartDish[] = [];

      state.cartDishes.forEach(cartDish => {
        const exitingDish = dishes.find(dish => dish.id === cartDish.dish.id);

        if (!exitingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: exitingDish
        });
      });
      state.cartDishes = newCartDishes;
    },
    clearCart: (state) => {
      state.cartDishes = [];
    }
  },
});

export const cartReducer = cartSlice.reducer;
export const {addDish, clearCart, updateCart} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;