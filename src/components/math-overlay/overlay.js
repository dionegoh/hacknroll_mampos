import {
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	NumberInput,
	NumberInputField,
	Heading,
} from '@chakra-ui/react'
import Question from './question'
import { useState, useMemo } from 'react';

function Overlay(props) {
	const [answer, setAnswer] = useState(0);
    const [userAnswer, setUserAnswer] = useState(0);
    const [answerError, setAnswerError] = useState(false);

	const onClose = () => { 
		props.toggleOverlay();
	}
	
	const difficulty = props.difficulty;

	const checkAnswer = () => {
		console.log("Real answer: " + answer)
		console.log("User answer: " + userAnswer)
		if (userAnswer == answer) {
			onClose();
			setAnswerError(false);
		}
		else
			setAnswerError(true);
	}

	return (
		<ModalContent>
			<ModalHeader>Solve this to stop the alarm!</ModalHeader>
			<ModalBody>
				{useMemo(() => {
					return(
					<Question
						difficulty={difficulty}
						setAnswer={setAnswer}
					>
				</Question>)}, [])}
				<NumberInput
					onChange={e => {
						e.keyCode === 'Enter' 
							? checkAnswer()
							: setUserAnswer(e)
						}
					}
					isInvalid={answerError}
					>
					<NumberInputField/>
				</NumberInput>
				<Heading size='sm' color='red.500'>{answerError ? "Try again!" : " " }</Heading>
			</ModalBody>
			
			<ModalFooter>
				<Button colorScheme='green' mr={3} onClick={checkAnswer}>
					Enter
				</Button>
			</ModalFooter>
		</ModalContent>
	)
}

export default Overlay;