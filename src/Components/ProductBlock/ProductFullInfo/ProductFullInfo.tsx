import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { mainOptions } from '../../../assets/params'
import { addItem } from '../../../redux/cartSlice'
import Loader from '../../Loader/Loader'
import ProductOptions from '../ProductOptions/ProductOptions'
import cls from './ProductFullInfo.module.css'

type Item = {
	id: number
	title: string
	category: number
	imageUrl: string
	rating: number
	prices: number[]
	types: number[]
	options: string[]
}

const ProductFullInfo: React.FC = () => {
	const { id } = useParams()
	const [item, setItem] = useState<Item>()
	const [currentPrice, setCurrentPrice] = useState(0)
	const [currentType, setCurrentType] = useState(0)
	const dispatch = useDispatch()

	useEffect(() => {
		async function fetchItem() {
			const { data } = await axios.get('https://62e92164249bb1284ebb1ada.mockapi.io/Products?id=' + id)
			setItem(data[0])
		}
		fetchItem()
	}, [])

	function addToCart() {
		if (!item) {
			return
		}
		dispatch(
			addItem({
				id: item.id,
				title: item.title,
				image: item.imageUrl,
				price: item.prices[currentPrice],
				options: item.options[currentPrice],
				type: mainOptions[currentType],
			})
		)
	}

	if (!item) {
		return (
			<div>
				<Loader />
			</div>
		)
	}

	return (
		<div className={cls.wrapper}>
			<div className={cls.product}>
				<img src={item.imageUrl} alt="product info" />
				<p>{item.title}</p>
				<div className={cls.options}>
					<ProductOptions
						firstOption={item.types}
						secondOption={item.options}
						setCurrentPrice={setCurrentPrice}
						setCurrentType={setCurrentType}
					/>
				</div>
			</div>
			<div className={cls.right}>
				<div className={cls.discription}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis suscipit odit ipsam repellendus rerum,
					earum sint aspernatur incidunt molestiae minus nam consectetur inventore quisquam adipisci aliquam commodi
					cumque. Omnis mollitia sit accusamus dicta aut nulla ut optio, qui ad iusto facilis harum deleniti laboriosam
					est esse illo fuga quibusdam quo, pariatur autem ratione voluptates? Perferendis atque recusandae nemo ratione
					eaque, iusto nihil debitis repellendus consectetur eius voluptate ducimus, pariatur quod maxime quis ex harum
					necessitatibus officia aliquam, sint excepturi possimus. Laudantium, accusantium quaerat quos nobis numquam
					illo et est quam repellat aliquid minus cupiditate quae corrupti laborum at nulla sint?
				</div>
				<div className={cls.bottom}>
					<div className={cls.price}>{item.prices[currentPrice]} $</div>
					<button onClick={() => addToCart()}>Add to cart</button>
				</div>
			</div>
		</div>
	)
}

export default ProductFullInfo
