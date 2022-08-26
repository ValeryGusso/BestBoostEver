import { useRef } from 'react'
import Categories from '../Categories/Categories'
import Loader from '../Loader/Loader'
import ProductBlock from '../ProductBlock/ProductBlock'
import Sort from '../Sort/Sort'
import { useSelector } from 'react-redux/es/exports'
import { selectIsLoad, selectItems } from '../../redux/productSlice'
import { selectSearsh } from '../../redux/filterSlice'
import cls from './Home.module.css'

type ProductBlockProps = {
	id: number
	title: string
	category: number
	imageUrl: string
	rating: number
	price: number
	types: string[]
	sizes: number[]
}

const Home: React.FC = () => {
	const search = useSelector(selectSearsh)
	const product: ProductBlockProps[] = useSelector(selectItems)
	const isLoad = useSelector(selectIsLoad)
	const itr = useRef<number>(0)

	return (
		<div className={cls.container}>
			<div className={cls.filters}>
				<Categories />
				<Sort />
			</div>
			<h2 className={cls.title}>Все товары:</h2>
			<div className={cls.content}>
				{isLoad ? (
					<Loader />
				) : (
					product
						.filter(el => el.title.toLowerCase().includes(search.toLowerCase()))
						.map(el => {
							return <ProductBlock {...el} key={itr.current++} />
						})
				)}
			</div>
		</div>
	)
}

export default Home
