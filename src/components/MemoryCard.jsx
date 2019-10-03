import React from 'react';
import '../css/MemoryCard.css';

export default function MemoryCard(props) {
	return (
		<div className='MemoryCard' onClick={props.pickCard}>
			<div
				className={
					props.isFlipped ? 'MemoryCardInner flipped' : 'MemoryCardInner'
				}>
				<div className='MemoryCardFront'>{props.Symbol}</div>
				<div className='MemoryCardBack'>
					<img
						src='https://www.digitalcrafts.com/img/DigitalCrafts-Logo-Wrench.png'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
}
