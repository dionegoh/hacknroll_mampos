import { Heading } from '@chakra-ui/react';

function Question(props) {
	const difficulty = props.difficulty;
	const setAnswer = (e) => {
		props.setAnswer(e);
	}

	const randomIntFromInterval = () => {
		// switch(difficulty){
		// 	case 'easy': return Math.floor(Math.random() * (99) + 1)
		// 	case 'medium': return Math.floor(Math.random() * (99) + 1)
		// 	case 'hard': return Math.floor(Math.random() * (99) + 1)
		// }
		return Math.floor(Math.random() * (99) + 1)
	}

	const randomArithmetic = () => {
		return Math.floor(Math.random() * 3) === 1 ? '+' : '-';
	}

	const number1 = randomIntFromInterval();
	const number2 = randomIntFromInterval();
	const number3 = randomIntFromInterval()

	const arithmetic = randomArithmetic();
	
	const larger = number1 > number2 ? number1 : number2;
	const smaller = number1 < number2 ? number1 : number2;

	if (difficulty === 'hard') {
		setAnswer(larger * smaller);
	} else if (difficulty === 'easy') {
		if (arithmetic === '+') {
			setAnswer(larger + smaller);
		} else {
			setAnswer(larger - smaller);
		}
	} else {
		if (arithmetic === '+') {
			setAnswer(larger + smaller + number3);
		} else {
			setAnswer(larger - smaller - number3);
		}

	}
	return (
		<Heading size='lg' >
			{ difficulty === 'easy' 
				? larger + ' ' + arithmetic + ' ' + smaller + ' = ? '
				: difficulty === 'medium'
					? larger + ' ' + arithmetic + ' ' + smaller + ' ' + arithmetic + ' ' + number3 + ' = ? ' 
					: larger + ' ' + '*' + ' ' + smaller + ' = ? '}
		</Heading>

	);
}

export default Question;