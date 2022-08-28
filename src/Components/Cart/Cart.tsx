import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCart, selectCartModal, selectItemModal, setCartModal } from '../../redux/cartSlice'
import CartEmpty from './CartEmpty'
import CartItem from './CartItem'
import cls from './Cart.module.css'
import Confirm from '../Confirm/Confirm'

const Cart: React.FC = () => {
	const { totalCount, totalPrice, items } = useSelector(selectCart)
	const dispatch = useDispatch()
	const showCartModal = useSelector(selectCartModal)
	const showItemModal = useSelector(selectItemModal)

	let key = 0

	function clear() {
		dispatch(setCartModal())
	}

	if (!totalCount) {
		return <CartEmpty />
	}
	return (
		<div className={cls.container}>
			<div className={cls.cart}>
				<div className={cls.header}>
					<div className={cls.title}>
						Your cart:
						<img src="https://www.svgrepo.com/show/95040/shopping-cart.svg" alt="cart" />
					</div>
					<div className={cls.clear} onClick={clear}>
						<img src="https://www.svgrepo.com/show/354700/waste-basket-14.svg" alt="clear" />
						Clear cart
					</div>
				</div>
				<div>
					{items.map(el => (
						<CartItem {...el} key={key++} index={key} />
					))}
				</div>
				<div className={cls.footer}>
					<div className={cls.info}>
						<span>
							{' '}
							Total count: <b>{totalCount} pcs.</b>{' '}
						</span>
						<span>
							{' '}
							Totat price: <b>{totalPrice} $</b>{' '}
						</span>
					</div>
					<div className={cls.buttons}>
						<Link to="/">
							<button className={cls.back}>
								<img src="https://www.svgrepo.com/show/36208/left-arrow.svg" alt="back" />
								Back
							</button>
						</Link>
						<Link to="payment">
							<button className={cls.pay}>Pay now</button>
						</Link>
					</div>
				</div>
			</div>
			{showCartModal || showItemModal ? <Confirm message={showCartModal ? 'clear cart?' : 'remove position?'} /> : ''}
		</div>
	)
}

export default Cart
