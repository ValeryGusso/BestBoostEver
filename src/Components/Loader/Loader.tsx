import cls from './Loader.module.css'

const Loader: React.FC = () => {
	return (
		<div className={cls.container}>

			<div className={cls.loader}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loader
