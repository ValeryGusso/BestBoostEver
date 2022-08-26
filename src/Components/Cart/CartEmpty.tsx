import { Link } from 'react-router-dom'
import cls from './CartEmpty.module.css'

const CartEmpty: React.FC =  () => {
  return (

      <div className={cls.cart}>
        <h2>Your cart is empty.</h2>
        <img src="https://cdn2.iconfinder.com/data/icons/outline-web-application-1/20/cart-512.png" alt="Empty cart" />
        <Link to="/">
							<button className={cls.back}>
								<img src="https://www.svgrepo.com/show/36208/left-arrow.svg" alt="back" />
								Back
							</button>
						</Link>
      </div>
  )
}

export default CartEmpty