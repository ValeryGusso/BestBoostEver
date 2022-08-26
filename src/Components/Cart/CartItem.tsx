import { useDispatch } from 'react-redux'
import { decrement, increment, setItemModal } from '../../redux/cartSlice'
import cls from './CartItem.module.css'

type CartItemProps = {
	id: number
	title: string
	price: number
	image: string
	size: number
	type: number
	counter?: number
	index?: number
}

const CartItem: React.FC<CartItemProps> = ({ id, title, price, image, size, type, counter, index }) => {
	const dispatch = useDispatch()

	function inc() {
		dispatch(increment({ id, size, type } as CartItemProps))
	}

	function dec() {
		if (counter && counter > 1) {
			dispatch(decrement({ id, size, type } as CartItemProps))
		}
	}

	function remove() {
		dispatch(setItemModal(index))
	}

	return (
		<div className={cls.item}>
			<div className={cls.img}>
				<img src={image} alt="product" />
			</div>
			<div className={cls.info}>
				<h3>{title}</h3>
				<p>
					{type}, {size} см.
				</p>
			</div>
			<div className={cls.count}>
				<button disabled={counter && counter <= 1 ? true : false} className={cls.button} onClick={() => dec()}>
					<img className={cls.inner} src="https://www.svgrepo.com/show/44062/minus.svg" alt="minus" />
				</button>
				<b>{counter}</b>
				<button className={cls.button} onClick={() => inc()}>
					<img className={cls.inner} src="https://www.svgrepo.com/show/56237/add.svg" alt="plus" />
				</button>
			</div>
			<div className={cls.price}>
				<b>{price * (counter || 0)} ₽</b>
			</div>
			<div className={cls.remove}>
				<button className={cls.button} onClick={() => remove()}>
					<img src="https://www.svgrepo.com/show/361452/cross-1.svg" alt="close" />
				</button>
			</div>
		</div>
	)
}

export default CartItem
