import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

	const ProductFullInfo: React.FC = () => {
	const { id } = useParams()
	const [item, setItem] = useState<{ imageUrl: string; title: string }>()

	useEffect(() => {
		async function fetchItem() {
			const { data } = await axios.get('https://62e92164249bb1284ebb1ada.mockapi.io/ProductData?id=' + id)
			setItem(data[0])
		}
		fetchItem()
	}, [])

	if (!item) {
		return (
			<div>
				<h1>Здарова, ёпта</h1>
			</div>
		)
	}

	return (
		<div>
			<img src={item.imageUrl} alt="product info" />
			<p>{item.title}</p>
		</div>
	)
}

export default ProductFullInfo
