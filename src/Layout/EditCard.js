import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { readDeck, updateCard } from '../utils/api'

export default function EditDeck() {
	const history = useHistory()
	const { deckId, cardId } = useParams()

	const [front, setFront] = useState('Front side of card')
	const [back, setBack] = useState('Back side of card')
	const [currentDeck, setCurrentDeck] = useState(null)
	const [currentCard, setCurrentCard] = useState(null)

	useEffect(() => {
		async function loadCard() {
			try {
				const response = await readDeck(deckId)
				setCurrentDeck(response)
				setCurrentCard(response.cards.find((card) => card.id + '' === cardId))
				setFront(response.cards.find((card) => card.id + '' === cardId).back)
				setBack(response.cards.find((card) => card.id + '' === cardId).back)
			} catch (error) {
				console.log(error)
			}
		}

		loadCard()
	}, [deckId, cardId])

	const handleCancel = (event) => {
		event.preventDefault()
		history.push(`/decks/${deckId}`)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const card = {
			...currentCard,
			front,
			back,
		}
		updateCard(card).then((response) => {
			setCurrentCard(response)
			history.push(`/decks/${deckId}`)
		})
	}

	if (currentDeck && currentCard) {
		return (
			<div>
				<div>
					<nav aria-label='breadcrumb'>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>
								<Link to='/'>Home</Link>
							</li>
							<li className='breadcrumb-item'>
								<Link to={`/decks/${deckId}`}>View Deck</Link>
							</li>
							<li className='breadcrumb-item' aria-current='page'>
								Edit Page
							</li>
						</ol>
					</nav>
				</div>
				<h2>Edit Card</h2>
				<form onSubmit={handleSubmit} className='form-group'>
					<label htmlFor='front'>Front</label>
					<textarea
						className='form-control'
						rows='3'
						required
						value={front}
						onChange={(event) => setFront(event.target.value)}
					/>
					<label htmlFor='back'>Back</label>
					<textarea
						className='form-control'
						rows='3'
						required
						value={back}
						onChange={(event) => setBack(event.target.value)}
					/>
					<button onClick={handleSubmit} className='btn btn-secondary mr-2'>
						Cancel
					</button>
					<button type='submit' className='btn btn-primary mr-2'>
						Submit
					</button>
				</form>
			</div>
		)
	} else {
		return <p>Loading...</p>
	}
}
