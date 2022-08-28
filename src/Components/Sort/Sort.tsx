import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { setDirection as setDirectionState, setSort } from '../../redux/filterSlice'
import { RootState } from '../../redux/store'
import React from 'react'
import cls from './Sort.module.css'
import { options } from '../../assets/params'

const y = ['2vmin', '8vmin', '14vmin']
const drc = ['asc', 'desc']

const Sort: React.FC = React.memo(() => {
	const [isOpen, setIsOpen] = useState(false)
	const sortRef = useRef<HTMLDivElement>(null)
	const [direction, setDirection] = useState(false)
	const [title, setTitle] = useState('')

	const { type: sortType, title: sortTitle } = useSelector((state: RootState) => state.filter.sortType)
	const dispatch = useDispatch()

	function click(event: MouseEvent) {
		const _event = event as MouseEvent & { path: Node[] }
		if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.body.addEventListener('click', click)
		return () => {
			document.body.removeEventListener('click', click)
		}
	}, [])

	return (
		<div ref={sortRef} className={cls.sort}>
			<div className={cls.label}>
				<img
					style={!direction ? { transform: 'rotateZ(180deg)' } : { transform: 'scale(1)' }}
					onClick={() => {
						setDirection(!direction)
						dispatch(setDirectionState({ sortDirection: direction ? drc[1] : drc[0] }))
					}}
					src="https://www.svgrepo.com/show/154721/up-arrow.svg"
					alt="arrow"
				/>
				<b
					className={cls.text}
					onClick={() => {
						setIsOpen(!isOpen)
					}}
				>
					Sort by:
				</b>
				<b
					className={cls.text}
					onClick={() => {
						setIsOpen(!isOpen)
					}}
				>
					{title}
				</b>
			</div>
			{isOpen && (
				<div className={cls.menu}>
					<ul>
						{options.map((el, i) => {
							return (
								<li
									key={i}
									className={sortType == el.type ? 'active' : ''}
									// @ts-ignore
									style={{ '--y': y[i] }}
									onClick={() => {
										dispatch(setSort(el))
										setIsOpen(false)
										setTitle(el.title)
									}}
								>
									{el.title}
								</li>
							)
						})}
					</ul>
				</div>
			)}
		</div>
	)
})

export default Sort
