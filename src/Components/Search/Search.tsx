import React from 'react'
import cls from './Search.module.css'
import { useDispatch } from 'react-redux/es/exports'
import { setSearch } from '../../redux/filterSlice'
import { useRef, useState } from 'react'

type Timer = {
	i: any
	delay: number
	start: (func: () => void) => void
	stop: () => void
}

const timer: Timer = {
	i: null,
	delay: 500,
	start(func: () => void) {
		this.i = setTimeout(() => {
			func()
		}, this.delay)
	},
	stop() {
		clearTimeout(this.i)
	},
}

const Search: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [inputValue, setInputValue] = useState('')
	const dispatch = useDispatch()

	return (
		<div className={cls.search}>
			
			<input
				ref={inputRef}
				onChange={event => {
					timer.stop()
					timer.start(() => dispatch(setSearch(event.target.value)))
					setInputValue(event.target.value)
				}}
				type="text"
				placeholder="Start typing..."
				value={inputValue}
			></input>
			{inputValue && (
				<img
					onClick={() => {
						inputRef.current?.focus()
						dispatch(setSearch(''))
						setInputValue('')
					}}
					src="https://cdn4.iconfinder.com/data/icons/line-basic-ecommerce/64/icons_ecommerce_line-12-512.png"
					alt="close"
				/>
			)}
			<img className={cls.find} src="https://www.svgrepo.com/show/392219/eye-find-view-vision-watch-alert.svg" alt="find" />
		</div>
	)
}

export default Search
