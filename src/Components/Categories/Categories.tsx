import React from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { categories } from "../../assets/params"
import { selectCategoryID, setCategory } from "../../redux/filterSlice"
import cls from './Categories.module.css'

const Categories: React.FC = React.memo(() => {

	const category = useSelector(selectCategoryID)
	const dispatch = useDispatch()	

	return (
		<div className={cls.categories}>
			<ul>
				{categories.map((el, i) => {
					return (
						<li 
            key={i} 
            className={category === i ? (cls.active) : ''} 
            onClick={() => dispatch(setCategory(i))}>
							{el}
						</li>
					)
				})}
			</ul>
		</div>
	)
})

export default Categories
