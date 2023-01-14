import {
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	NumberInput,
	NumberInputField,
	VStack,
} from '@chakra-ui/react'
import Question from './question'
import { useState, useMemo } from 'react';

function Overlay(props) {
	const [answer, setAnswer] = useState(0);
    const [userAnswer, setUserAnswer] = useState(0);

	const onClose = () => { 
		props.toggleOverlay();
	}

	const checkAnswer = () => {
		console.log("Real answer: " + answer)
		console.log("User answer: " + userAnswer)
		if (userAnswer == answer)
			onClose()
	}

	return (
		<ModalContent>
			<ModalHeader>Solve this to stop the alarm!</ModalHeader>
			<ModalCloseButton/>
			<ModalBody>
				{useMemo(() => {
					return(<Question
					difficulty="hard"
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
					>
					<NumberInputField/>
				</NumberInput>
			</ModalBody>

			<ModalFooter>
				<VStack>
					<Button colorScheme='blue' mr={3} onClick={checkAnswer}>
						Enter
					</Button>
				</VStack>
			</ModalFooter>
		</ModalContent>
	)
}

export default Overlay;