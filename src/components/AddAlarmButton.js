import { useState, useRef } from 'react';
import {
	Button, ChakraProvider, HStack, Text, VStack,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Select
} from '@chakra-ui/react';

function AddAlarmButton() {
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const currentDate = new Date();
	const [hour, setHour] = useState(currentDate.getHours());
	const [minutes, setMinutes] = useState(currentDate.getMinutes());
	const [difficulty, setDifficulty] = useState("Easy");
	const cancelRef = useRef();
	const toggleOverlay = () => {
		setIsOverlayVisible(!isOverlayVisible);
	}

	return (
		<ChakraProvider>
			<Button colorScheme='cyan' onClick={() => toggleOverlay()}>Add Alarm</Button>
			<AlertDialog
				isOpen={isOverlayVisible}
				leastDestructiveRef={cancelRef}
				onClose={() => toggleOverlay()}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Add Alarm
						</AlertDialogHeader>

						<AlertDialogBody>
							<VStack alignItems='flex-start'>
								<HStack>
									<Text>Time:</Text>
									<NumberInput w='40%' defaultValue='1' max={12} min={1} clampValueOnBlur={false} onChange={e => setHour(e)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									<Text>:</Text>
									<NumberInput w='40%' defaultValue='0' max={59} min={0} clampValueOnBlur={false} onChange={e => setMinutes(e)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</HStack>
								<HStack>
									<Text>Difficulty:</Text>
									<Select w='100%' onChange={e => setDifficulty(e)}>
										<option value='option1'>easy</option>
										<option value='option2'>medium</option>
										<option value='option2'>hard</option>
									</Select>
								</HStack>
							</VStack>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={() => toggleOverlay()}>
								Cancel
							</Button>
							<Button colorScheme='green' onClick={() => toggleOverlay()} ml={3}>
								Confirm
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</ChakraProvider>
	)
}

export default AddAlarmButton;