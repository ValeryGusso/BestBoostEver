import { useState, useContext } from 'react'
import { Context } from '../../../App'
import cls from './ProductOptions.module.css'

const mainOptions: string[] = ['Тонкое', 'Традиционное']

type ProductOptionsProps = {
	firstOption: string[];
	secondOption: number[]
}

const ProductOptions: React.FC<ProductOptionsProps> = (props) => {
	const [activeFirst, setActiveFirst] = useState(0)
	const [activeSecond, setActiveSecond] = useState(0)
	const context = useContext(Context)

	return (
		<div className={cls.content}>
			<ul>
				{props.firstOption.map((_, i) => {
					return (
						<li 
							key={i} 
							className={activeFirst == i ? cls.active : ''} 
							onClick={() => {
								context.activeFirst = mainOptions[i]
								setActiveFirst(i)}}>
							 {mainOptions[i]}
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
								context.activeSecond = el
								setActiveSecond(i)}}>
							  {el} см.
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default ProductOptions
