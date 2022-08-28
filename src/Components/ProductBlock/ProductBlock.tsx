import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cartSlice'
import ProductOptions from './ProductOptions/ProductOptions'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import cls from './ProductBlock.module.css'
import { mainOptions } from '../../assets/params'
import { Item } from '../../redux/productSlice'


const ProductBlock: React.FC<Item> = props => {
	// Возможно ещё пригодится, если понадобится счётчик добавленных товаров
	// const count = useSelector((state: RootState) => state.cart.items.find(obj => obj.id === props.id))
	const dispatch = useDispatch()
	const [currentPrice, setCurrentPrice] = useState(0)
	const [currentType, setCurrentType] = useState(0)

	function setItem() {
		dispatch(
			addItem({
				id: props.id,
				title: props.title,
				image: props.imageUrl,
				price: props.prices[currentPrice],
				options: props.options[currentPrice],
				type: mainOptions[currentType],
			})
		)
	}

	return (
		<div className={cls.product}>
			<Link to={`product/${props.id}`}>
				<img src={props.imageUrl} alt="image" />
				<h4 className={cls.title}>{props.title}</h4>
			</Link>
			<div className={cls.options}>
				<ProductOptions
					firstOption={props.types}
					secondOption={props.options}
					setCurrentPrice={setCurrentPrice}
					setCurrentType={setCurrentType}
				/>
			</div>
			<div className={cls.bottom}>
				<div className={cls.price}>{props.prices[currentPrice]} $</div>
				<button onClick={() => setItem()}>Add to cart</button>
			</div>
		</div>
	)
}

export default ProductBlock
