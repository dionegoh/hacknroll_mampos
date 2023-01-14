import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import {
	Box, Button, ChakraProvider, HStack, Text, VStack,
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
	Select,
	Modal, 
	ModalOverlay
} from '@chakra-ui/react';
import Sound from '../mixkit-casino-win-alarm-and-coins-1990.mp3';
import { DeleteIcon } from '@chakra-ui/icons';
import AlarmContext from '../AlarmContext';
import MathOverlay from '../components/math-overlay/overlay';

function Alarm(props) {
	const [alarmProfile, setAlarmProfile] = useState(props);
	const { alarmList, setAlarmList } = useContext(AlarmContext);
	const [alarmId, setAlarmId] = useState(alarmProfile.alarmId);
	const [hour, setHour] = useState(alarmProfile.hour);
	const [minutes, setMinutes] = useState(alarmProfile.minutes);
	const [difficulty, setDifficulty] = useState(alarmProfile.difficulty);
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const [isMathOverlayOpen, setIsMathOverlayOpen] = useState(false);
	const cancelRef = useRef();
	const alarmSound = useMemo(() => new Audio(Sound), [Sound]); // insert audio file
	const time = `${alarmProfile.hour} : ${alarmProfile.minutes}`;
	
	const toggleMathOverlay = () => {
		setIsMathOverlayOpen(!isMathOverlayOpen)
	}

	const toggleOverlay = () => {
		setIsOverlayVisible(!isOverlayVisible);
	}
	const updateAlarm = () => {
		setAlarmProfile({
			hour: hour,
			minutes: minutes,
			difficulty: difficulty
		});
		toggleOverlay();
	}

	const cancelAlarm = () => {
		setHour(alarmProfile.hour);
		setMinutes(alarmProfile.minutes);
		setDifficulty(alarmProfile.difficulty);
		toggleOverlay();
	}

	const checkAlarm = (currDate) => {
		console.log("Checking alarm");
		if (currDate.getHours().toString() === alarmProfile.hour.toString() && currDate.getMinutes().toString() === alarmProfile.minutes.toString()) {
			console.log("Alarm!!!!");
			alarmSound.play();
			alarmSound.loop = true;
			setIsMathOverlayOpen(true);
		}
	}

	console.log(alarmProfile);
	const deleteAlarm = () => {
		const newList = alarmList.filter((item) => item.alarmId.toString() !== alarmId.toString());
		setAlarmList(newList);
	}

	const pauseAlarm = () => {
		alarmSound.loop = false;
		alarmSound.pause();
	  };

	useEffect(() => {
		setAlarmProfile(props);
		const interval = setInterval(() => {
			checkAlarm(new Date());
		  }, 1000);
		return () => clearInterval(interval); 
	}, [props])

	return (
		<ChakraProvider>
			<Modal
				isOpen={isMathOverlayOpen}
				onCloseComplete={() => {
					pauseAlarm();
					deleteAlarm();
					}
				}
				>
				<ModalOverlay>
					<MathOverlay
						toggleOverlay={toggleMathOverlay}
						difficulty={alarmProfile.difficulty}
						>
					</MathOverlay>
				</ModalOverlay>
			</Modal>
			<HStack w='400px'>
				<HStack w='70%'>
					<VStack>
						<Text fontSize='4xl' as='b'>{time}</Text>
					</VStack>
					<Box>
						<Text fontSize='md' as='u'>{alarmProfile.difficulty}</Text>
					</Box>
				</HStack>
				<HStack w='30%'>
					<Button
						w='100px'
						colorScheme='green'
						onClick={() => toggleOverlay()}>Edit</Button>
					<Button
						w='100px'
						colorScheme='red'
						onClick={() => deleteAlarm()}>Delete</Button>
				</HStack>
			</HStack>
			<AlertDialog
				isOpen={isOverlayVisible}
				leastDestructiveRef={cancelRef}
				onClose={() => toggleOverlay()}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Edit Alarm
						</AlertDialogHeader>

						<AlertDialogBody>
							<VStack alignItems='flex-start'>
								<HStack>
									<Text>Time:</Text>
									<NumberInput w='40%' defaultValue={alarmProfile.hour} max={23} min={0} clampValueOnBlur={false} onChange={e => setHour(e)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									<Text>:</Text>
									<NumberInput w='40%' defaultValue={alarmProfile.minutes} max={59} min={0} clampValueOnBlur={false} onChange={e => setMinutes(e)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</HStack>
								<HStack>
									<Text>Difficulty:</Text>
									<Select w='100%' onChange={e => setDifficulty(e.target.value)}>
										<option value='easy'>easy</option>
										<option value='medium'>medium</option>
										<option value='hard'>hard</option>
									</Select>
								</HStack>
							</VStack>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={() => cancelAlarm()}>
								Cancel
							</Button>
							<Button colorScheme='green' onClick={() => updateAlarm()} ml={3}>
								Confirm
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</ChakraProvider>
	)
}

export default Alarm;