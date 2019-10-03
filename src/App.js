import React from 'react';
import MemoryCard from './components/MemoryCard';

import './App.css';

function generateDeck() {
	const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
	const deck = [];
	for (let i = 0; i < 16; i++) {
		const card = { isFlipped: true, Symbol: symbols[i % 8] };
		deck.push(card);
	}
	const shuffle = array => array.sort((a, b) => 0.5 - Math.random());

	return shuffle(deck);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { deck: generateDeck(), pickedCards: [] };
	}
	componentDidMount() {
		setTimeout(() => {
			const newDeck = this.state.deck.map(card => {
				card.isFlipped = false;
				return card;
			});
			this.setState(prevState => ({ ...prevState, deck: newDeck }));
		}, 1500);
	}
	pickCard = cardIndex => {
		if (this.state.deck[cardIndex].isFlipped) {
			return;
		}
		const cardToFlip = { ...this.state.deck[cardIndex] };
		cardToFlip.isFlipped = true;
		let newPickedCards = this.state.pickedCards.concat(cardIndex);

		const newDeck = this.state.deck.map((card, i) => {
			if (cardIndex === i) {
				return cardToFlip;
			}
			return card;
		});
		if (newPickedCards.length === 2) {
			const card1Index = newPickedCards[0];
			const card2Index = newPickedCards[1];
			if (newDeck[card1Index].Symbol !== newDeck[card2Index].Symbol) {
				setTimeout(() => {
					this.unflipCards(card1Index, card2Index);
				}, 1000);
			}
			newPickedCards = [];
		}
		this.setState(prevState => ({
			deck: newDeck,
			pickedCards: newPickedCards
		}));
	};

	unflipCards = (card1Index, card2Index) => {
		const card1 = { ...this.state.deck[card1Index] };
		const card2 = { ...this.state.deck[card2Index] };
		card1.isFlipped = false;
		card2.isFlipped = false;
		const newDeck = this.state.deck.map((card, i) => {
			if (card1Index === i) {
				return card1;
			} else if (card2Index === i) {
				return card2;
			}
			return card;
		});
		this.setState(prevState => ({ ...prevState, deck: newDeck }));
	};
	render() {
		const cardsJSX = this.state.deck.map((card, i) => {
			return (
				<MemoryCard
					key={i}
					isFlipped={card.isFlipped}
					Symbol={card.Symbol}
					pickCard={this.pickCard.bind(this, i)}
				/>
			);
		});
		return (
			<div className='App'>
				<header className='App-header'>
					<h1>Memory Game</h1>
					<p>Match Cards to win</p>
				</header>
				<div>{cardsJSX.slice(0, 4)}</div>
				<div>{cardsJSX.slice(4, 8)}</div>
				<div>{cardsJSX.slice(8, 12)}</div>
				<div>{cardsJSX.slice(12, 16)}</div>
			</div>
		);
	}
}
export default App;
