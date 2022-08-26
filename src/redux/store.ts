import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import cartReducer from './cartSlice'
import productReducer from './productSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    product: productReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

type TypeDispatch = typeof store.dispatch
export const useTypeDispatch = () => useDispatch<TypeDispatch>()