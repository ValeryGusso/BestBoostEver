import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { parseLS, selectCart } from '../../redux/cartSlice'
import Search from '../Search/Search'
import cls from './Header.module.css'

const Header: React.FC = () => {
	const { totalCount, totalPrice, items } = useSelector(selectCart)
	const isFirstRender = useRef<boolean>(false)
	const dispatch = useDispatch()

	useEffect(() => {
		if (isFirstRender.current) {
			const json = JSON.stringify(items)
			localStorage.setItem('Cart', json)
		}

		const data = localStorage.getItem('Cart')
		if (data) {
			dispatch(parseLS(JSON.parse(data)))
		}

		isFirstRender.current = true
	}, [totalCount])

	return (
		<div className={cls.header}>
			<Link to="/">
				<div className={cls.logo}>
					<div className={cls.title}>
						<img width="78" src="https://www.svgrepo.com/show/174141/bird.svg" alt="Pizza logo" />
						<h1>Gusso Boost</h1>
					</div>
						<p>best boost ever</p>
				</div>
			</Link>
			<Search />
			<Link to="/cart">
				<div className={cls.cart}>
					<span>{totalPrice} ₽</span>
					<img src="https://www.svgrepo.com/show/95040/shopping-cart.svg" alt="cart" />
					<span>{totalCount}</span>
				</div>
			</Link>
		</div>
	)
}

export default Header
