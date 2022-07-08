import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { createCard, readDeck } from '../utils/api'

export default function CreateCard() {
	const params = useParams()
	const history = useHistory()

	const [front, setFront] = useState('Front side of card')
	const [back, setBack] = useState('Back side of card')
	const [currentDeck, setCurrentDeck] = useState(null)

	useEffect(() => {
		const abortController = new AbortController()
		async function loadDeck() {
			setCurrentDeck([])
			try {
				const response = await readDeck(params.deckId)
				setCurrentDeck(response)
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Aborted', params)
				} else {
					throw error
				}
				console.log(error)
			}
		}

		loadDeck()

		return () => abortController.abort()
	}, [params])

	const handleDone = (event) => {
		event.preventDefault()
		history.push(`/decks/${params.deckId}`)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const card = {
			front: front,
			back: back,
			deckId: params.deckId,
		}

		createCard(params.deckId, card).then((response) => {
			console.log(response)
			setFront('Front side of card')
			setBack('Back side of card')
		})
		history.push(`/decks/${currentDeck.id}`)
	}

	if (currentDeck) {
		return (
			<div>
				<div>
					<nav aria-label='breadcrumb'>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>
								<Link to='/'>Home</Link>
							</li>
							<li className='breadcrumb-item'>
								<Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link>
							</li>
							<li className='breadcrumb-item active' aria-current='page'>
								Add Card
							</li>
						</ol>
					</nav>
				</div>
				<h2>{currentDeck.name}: Add Card</h2>
				<form onSubmit={handleSubmit} className='form-group'>
					<label htmlFor='front'>Front</label>
					<textarea
						className='form-control'
						rows='3'
						required
						value={front}
						onChange={(e) => setFront(e.target.value)}
					/>
					<label htmlFor='back'>Back</label>
					<textarea
						className='form-control'
						rows='3'
						required
						value={back}
						onChange={(e) => setBack(e.target.value)}
					/>
					<button onClick={handleDone} className='btn btn-secondary mr-2'>
						Done
					</button>
					<button type='submit' className='btn btn-primary'>
						Save
					</button>
				</form>
			</div>
		)
	} else {
		return <p>Loading...</p>
	}
}
