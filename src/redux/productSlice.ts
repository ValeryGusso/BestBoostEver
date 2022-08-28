import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export type Item = {
	id: number;
	title: string;
	category: number;
	imageUrl: string;
	rating: number;
	prices: number[];
	types: number[];
	options: string[] 
}

interface ProductSliceState {
	items: Item[];
	isLoad: boolean
}

const initialState: ProductSliceState = {
	items: [],
	isLoad: true,
}

export const fetchProduct = createAsyncThunk('product/fetchProductStatus', async (props:{categoryID: number}) => {
  const {categoryID} = props
	const { data } = await axios.get(
		`https://62e92164249bb1284ebb1ada.mockapi.io/Products`
		// ${categoryID !== 0 ? '?category=' + (categoryID - 1) : ''}
	)
	return data as Item[]
})

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProduct.pending, (state) => {
			state.isLoad = true
			state.items = []
		})

		builder.addCase(fetchProduct.fulfilled, (state, action) => {
			state.items = action.payload
			state.isLoad = false
		})

		builder.addCase(fetchProduct.rejected, (state) => {
			state.isLoad = false
			state.items = []
		})
	}
})

export const selectItems = (state: RootState) => state.product.items
export const selectIsLoad = (state: RootState) => state.product.isLoad

export default productSlice.reducer
