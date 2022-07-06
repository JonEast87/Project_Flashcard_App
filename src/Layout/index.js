import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Home from './Home'

function Layout() {
	return (
		<div className='container'>
			<Header /> {/*  */}
			<Switch>
				<Route exact path='/'>
					<Home /> {/* listDecks() route = '/' */}
				</Route>
			</Switch>
			{/* route = '/decks/:deckId/study' */}
			{/* route = '/decks/new' */}
			{/* readDeck() route = '/decks/:deckId' */}
			{/* updateDeck() route = '/decks/:deckId/edit' */}
			{/* route = '/decks/:deckId/cards/new' */}
			{/* route = '/decks/:deckId/cards/:cardId/edit' */}
			{/* route = NotFound */}
		</div>
	)
}

export default Layout
