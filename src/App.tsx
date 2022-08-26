import './main.css'
import React, { useEffect, useRef } from 'react'
import Header from './Components/Header/Header'
import Home from './Components/Pages/Home'
import Cart from './Components/Pages/Cart'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import qs from 'qs'
import { selectCategoryID, selectDirection, selectSortType, setFilters } from './redux/filterSlice'
import { fetchProduct } from './redux/productSlice'
import ProductFullInfo from './Components/ProductBlock/ProductFullInfo/ProductFullInfo'
import { useTypeDispatch } from './redux/store'

type Sort = { categoryID: string; sortType: string }

const App: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useTypeDispatch()
	const isSearch = useRef<boolean>(false)
	const isFirstRender = useRef<boolean>(true)
	const categoryID = useSelector(selectCategoryID)
	const sortType = useSelector(selectSortType)
	const sortDirection = useSelector(selectDirection)

	const contextData = {
		activeFirst: 'тонкое',
		activeSecond: 26,
	}

	function fetchData() {
		dispatch(fetchProduct({ categoryID, sortType, sortDirection }))
	}

	// Парсинг адресной строки в редух
	useEffect(() => {
		if (window.location.search) {
			const { categoryID, sortType } = qs.parse(window.location.search.substring(1)) as Sort
			const queryParams = {
				categoryID,
				sortType,
			}
			fetchData()
			dispatch(setFilters(queryParams))
			isSearch.current = true
		}
	}, [])

	// Редактирование адерсной строки
	useEffect(() => {
		if (!isSearch.current) {
			fetchData()
			if (!isFirstRender.current) {
				const queryParams =
					'?' +
					qs.stringify({
						categoryID,
						sortType,
					})
				navigate(queryParams)
			}
			isFirstRender.current = false
		}
		isSearch.current = false
	}, [sortType, categoryID, sortDirection])

	return (
		<div className="wrapper">
			<Context.Provider value={contextData}>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/product/:id" element={<ProductFullInfo />} />
					<Route path="*" element={<h1>АШЫПКА</h1>} />
				</Routes>
			</Context.Provider>
		</div>
	)
}

export default App

export const Context: React.Context<any> = React.createContext('')
