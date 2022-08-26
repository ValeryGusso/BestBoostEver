import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cartSlice'
import ProductOptions from './ProductOptions/ProductOptions'
import { useContext } from 'react'
import { Context } from '../../App'
import { Link } from 'react-router-dom'
import cls from './ProductBlock.module.css'

type ProductBlockProps = {
	id: number;
	title: string;
	category: number;
	imageUrl: string;
	rating: number;
	price: number;
	types: string[];
	sizes: number []   
}
const ProductBlock: React.FC<ProductBlockProps> = (props) => {
	// Возможно ещё пригодится, если понадобится счётчик добавленных товаров
	// const count = useSelector((state: RootState) => state.cart.items.find(obj => obj.id === props.id))
	const dispatch = useDispatch()
	const context = useContext(Context)

	function setItem() {
		dispatch(
			addItem({
				id: props.id,
				title: props.title,
				image: props.imageUrl,
				price: props.price,
				size: context.activeSecond,
				type: context.activeFirst,
			})
		)
	}

	return (
		<div className={cls.product}>
			<Link to={`product/${props.id}`}>
				<img src={props.imageUrl} alt="Pizza" />
				<h4 className={cls.title}>{props.title}</h4>
			</Link>
			<ProductOptions firstOption={props.types} secondOption={props.sizes} />
			<div className={cls.bottom}>
				<div className={cls.price}>{props.price} ₽</div>
				<button onClick={() => setItem()}>
					<span>Добавить</span>
				</button>
			</div>
		</div>
	)
}

export default ProductBlock
