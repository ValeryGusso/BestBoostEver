import { useDispatch } from 'react-redux'
import { clearCart, removeItem, setCartModal, setItemModal } from '../../redux/cartSlice'
import cls from './Confirm.module.css'

const Confirm: React.FC<{message: string}> = props => {

  const dispatch = useDispatch()
  const { message } = props

  function confirm () {
    if (message === 'clear cart?') {
      dispatch(setCartModal())
      dispatch(clearCart())
    }

    if (message === 'remove position?') {
      dispatch(removeItem())
        // @ts-ignore
      dispatch(setItemModal())
    }
  }

  function hide () {
    if (message === 'clear cart?') {
      dispatch(setCartModal())
    }

    if (message === 'remove position?') {
        // @ts-ignore
      dispatch(setItemModal())
    }
  }
	return (
		<div className={cls.modal}>
			<div className={cls.content}>
				Are you sure want to {message}
				<div className={cls.btns}>
					<button onClick={hide}>No</button>
					<button onClick={confirm}>Yes</button>
				</div>
			</div>
		</div>
	)
}

export default Confirm
