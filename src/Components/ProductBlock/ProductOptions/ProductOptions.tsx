import { Dispatch, SetStateAction, useState } from 'react'
import { mainOptions } from '../../../assets/params'
import cls from './ProductOptions.module.css'

type ProductOptionsProps = {
	firstOption: number[]
	secondOption: string[]
	setCurrentPrice: Dispatch<SetStateAction<number>>
	setCurrentType: Dispatch<SetStateAction<number>>
}

const ProductOptions: React.FC<ProductOptionsProps> = (props) => {
	const [activeFirst, setActiveFirst] = useState(0)
	const [activeSecond, setActiveSecond] = useState(0)

	return (
		<div className={cls.content}>
			<ul>
				{props.firstOption.map((el, i) => {
					return (
						<li 
							key={el} 
							className={activeFirst === i ? cls.active : ''} 
							onClick={() => {
								props.setCurrentType(el)
								setActiveFirst(i)}}>
							 {mainOptions[el]}
						</li>
					)
				})}
			</ul>
			<ul>
				{props.secondOption.map((el, i) => {
					return (
						<li 
							key={i} 
							className={activeSecond == i ? cls.active : ''} 
							onClick={() => {
								props.setCurrentPrice(i)
								setActiveSecond(i)}}>
							  {el}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default ProductOptions
