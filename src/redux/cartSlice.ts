import { RootState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Item = {
	id: number;
	title: string;
	image: string;
	price: number;
	size: number;
	type: number;
	counter?: number
}

interface CartSliceState {
	totalPrice: number;
	totalCount: number;
	items: Item[],
	cartModal: boolean,
	itemModal: boolean,
	itemRemoveIndex: number
}


const initialState: CartSliceState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
	cartModal: false,
	itemModal: false,
	itemRemoveIndex: 0
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<Item>) {
			const findItem = state.items.find(
				obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type
			)

			if (findItem && findItem.counter) {
				findItem.counter++
			} else {
				state.items.push({ ...action.payload, counter: 1 })
			}
			state.totalPrice = state.items.reduce((acc, el) => acc + el.price * (el.counter ? el.counter : 0), 0)
			state.totalCount = state.items.reduce((acc, el) => acc + (el.counter ? el.counter : 0), 0)
		},
		removeItem(state) {
			// Старый вариант, он работает, но не совсем так, как хотелось бы. Фиксить лень, проще переделать полностью
			// state.items = state.items.filter(obj => obj.id !== action.payload.id && obj.size !== action.payload.size && obj.type !== action.payload.type)
			state.items.splice(state.itemRemoveIndex - 1, 1)
			state.totalPrice = state.items.reduce((acc, el) => acc + el.price * (el.counter ? el.counter : 0), 0)
			state.totalCount = state.items.reduce((acc, el) => acc + (el.counter ? el.counter : 0), 0)
		},
		clearCart(state) {
			state.totalPrice = 0
			state.totalCount = 0
			state.items = []
			localStorage.clear()
		},
		increment(state, action: PayloadAction<Item>) {
			const findItem = state.items.find(
				obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type
			)
			if (findItem && findItem.counter) {
			findItem.counter++
			}
			state.totalPrice = state.items.reduce((acc, el) => acc + el.price * (el.counter ? el.counter : 0), 0)
			state.totalCount = state.items.reduce((acc, el) => acc + (el.counter ? el.counter : 0), 0)
		},
		decrement(state, action: PayloadAction<Item>) {
			const findItem = state.items.find(
				obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type
			)
			if (findItem && findItem.counter && findItem.counter > 0) {
				findItem.counter--
			}
			state.totalPrice = state.items.reduce((acc, el) => acc + el.price * (el.counter ? el.counter : 0), 0)
			state.totalCount = state.items.reduce((acc, el) => acc + (el.counter ? el.counter : 0), 0)
		},
		parseLS(state, action) {
			state.items = action.payload
			state.totalPrice = state.items.reduce((acc, el) => acc + el.price * (el.counter ? el.counter : 0), 0)
			state.totalCount = state.items.reduce((acc, el) => acc + (el.counter ? el.counter : 0), 0)
		},
		setCartModal(state) {
			state.cartModal = !state.cartModal
		},
		setItemModal(state, action) {
			state.itemModal = !state.itemModal
			state.itemRemoveIndex = action.payload
		}
	},
})

export const selectCart = (state: RootState) => state.cart
export const selectCartModal = (state: RootState) => state.cart.cartModal
export const selectItemModal = (state: RootState) => state.cart.itemModal
export const selectItemRemoveIndex = (state: RootState) => state.cart.itemRemoveIndex
export const { addItem, removeItem, clearCart, increment, decrement, parseLS, setCartModal, setItemModal } = cartSlice.actions

export default cartSlice.reducer
