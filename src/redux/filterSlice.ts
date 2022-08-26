import { RootState } from './store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Sort = {
	title: string
	type: string
	sortDirection?: string
}

interface filterSliceState {
	categoryID: number
	sortType: Sort
	sortDirection: string;
	search: string
}

const initialState: filterSliceState = {
	categoryID: 0,
	sortType: {
		title: 'популярности',
		type: 'rating',
	},
	sortDirection: 'asc',
	search: '',
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory(state, action: PayloadAction<number>) {
			state.categoryID = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sortType.title = action.payload.title
			state.sortType.type = action.payload.type
		},
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload
		},
		setFilters(state, action: PayloadAction<{ categoryID: string; sortType: string }>) {
			state.categoryID = +action.payload.categoryID
			state.sortType.type = action.payload.sortType
		},
		setDirection(state, action: PayloadAction<{sortDirection: string}>) {
			state.sortDirection = action.payload.sortDirection
			console.log(123)
		},
	},
})

export const selectCategoryID = (state: RootState) => state.filter.categoryID
export const selectSortType = (state: RootState) => state.filter.sortType.type
export const selectDirection = (state: RootState) => state.filter.sortDirection
export const selectSearsh = (state: RootState) => state.filter.search

export const { setCategory, setSort, setSearch, setFilters, setDirection } = filterSlice.actions

export default filterSlice.reducer
