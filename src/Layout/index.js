import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Study from './Study'
import Deck from './Deck'
import CreateDeck from './CreateDeck'
import EditDeck from './EditDeck'
import CreateCard from './CreateCard'
import EditCard from './EditCard'
import NotFound from './NotFound'

export default function Layout() {
	return (
		<div className='container'>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Home /> {/* listDecks() route = '/' */}
				</Route>
				<Route exact path='/decks/new'>
					<CreateDeck /> {/* route = '/decks/new' */}
				</Route>
				<Route exact path='/decks/:deckId'>
					<Deck /> {/* readDeck() route = '/decks/:deckId' */}
				</Route>
				<Route exact path='/decks/:deckId/study'>
					<Study /> {/* route = '/decks/:deckId/study' */}
				</Route>
				<Route exact path='/decks/:deckId/edit'>
					<EditDeck /> {/* updateDeck() route = '/decks/:deckId/edit' */}
				</Route>
				<Route exact path='/decks/:deckId/cards/new'>
					<CreateCard /> {/* route = '/decks/:deckId/cards/new' */}
				</Route>
				<Route exact path='/decks/:deckId/cards/:cardId/edit'>
					<EditCard /> {/* route = '/decks/:deckId/cards/:cardId/edit' */}
				</Route>
				<Route>
					<NotFound /> {/* route = NotFound */}
				</Route>
			</Switch>
		</div>
	)
}
