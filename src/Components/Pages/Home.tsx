import { useEffect, useRef, useState } from 'react'
import Categories from '../Categories/Categories'
import Loader from '../Loader/Loader'
import ProductBlock from '../ProductBlock/ProductBlock'
import Sort from '../Sort/Sort'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchProduct, Item, selectIsLoad, selectItems } from '../../redux/productSlice'
import { selectCategoryID, selectDirection, selectSearsh, selectSortType } from '../../redux/filterSlice'
import cls from './Home.module.css'
import { options } from '../../assets/params'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import Finder from '../FInder/Finder'

const Home: React.FC = () => {
	const search = useSelector(selectSearsh)
	const product: Item[] = useSelector(selectItems)
	const [items, setItems] = useState<Item[]>(useSelector(selectItems))
	const isLoad = useSelector(selectIsLoad)
	const itr = useRef<number>(0)
	const sortType = useSelector(selectSortType)
	const sortDirection = useSelector(selectDirection)
	const categoryID = useSelector(selectCategoryID)

	function sort(type: string) {
		switch (type) {
			case options[0].type: {
				const sorted: Item[] = [...items].sort((a, b) => {
					return b.rating - a.rating
				})
				setItems(sorted)
				break
			}
			case options[1].type: {
				const sorted: Item[] = [...items].sort((a, b) => {
					return a.prices[0] - b.prices[0]
				})
				setItems(sorted)
				console.log(items)
				break
			}
			case options[2].type: {
				const sorted: Item[] = [...items].sort((a, b) => {
					if (a.title < b.title) {
						return -1
					} else {
						return 1
					}
				})
				setItems(sorted)
				break
			}
		}
	}
	

	useEffect(() => {
		setItems(product)
	}, [])

	useEffect(() => {
		if (categoryID === 0) {
			setItems(product)
			return
		}
		const sorted: Item[] = product.filter(el => el.category === categoryID - 1)
		setItems(sorted)
	}, [categoryID])


	useEffect(() => {
		sort(sortType)
		if (items && sortDirection !== 'asc') {
			setItems([...items].reverse())
		}
	}, [sortType, sortDirection])

	return (
		<div className={cls.container}>
			<div className={cls.filters}>
				<Categories />
				<Sort />
			</div>
			<div className={cls.content}>
				{isLoad ? (
					<Loader />
				) : categoryID !== -1 ? (items
						.filter(el => el.title.toLowerCase().includes(search.toLowerCase()))
						.map(el => {
							return <ProductBlock {...el} key={itr.current++} />
						}) 
				) : <Finder /> }
			</div>
		</div>
	)
}


export default Home