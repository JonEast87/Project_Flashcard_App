import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Study from './Study'
import Deck from './Deck'

function Layout() {
	return (
		<div className='container'>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Home /> {/* listDecks() route = '/' */}
				</Route>
				<Route exact path='/decks/:deckId/study'>
					<Study /> {/* route = '/decks/:deckId/study' */}
				</Route>
				<Route exact path='/decks/:deckId'>
					<Deck /> {/* readDeck() route = '/decks/:deckId' */}
				</Route>
			</Switch>
			{/* route = '/decks/new' */}

			{/* updateDeck() route = '/decks/:deckId/edit' */}
			{/* route = '/decks/:deckId/cards/new' */}
			{/* route = '/decks/:deckId/cards/:cardId/edit' */}
			{/* route = NotFound */}
		</div>
	)
}

export default Layout
