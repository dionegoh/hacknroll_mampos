import { useState, useEffect, useRef, useContext } from 'react';
import {
	Badge,
	Box, Button, ChakraProvider, HStack, IconButton, Text, VStack,
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
import Sound from '../mixkit-casino-win-alarm-and-coins-1990.mp3';
import { DeleteIcon } from '@chakra-ui/icons';
import AlarmContext from '../AlarmContext';

function Alarm(props) {
	const [alarmProfile, setAlarmProfile] = useState(props);
	const { alarmList, setAlarmList } = useContext(AlarmContext);
	const [alarmId, setAlarmId] = useState(alarmProfile.alarmId);
	const [hour, setHour] = useState(alarmProfile.hour);
	const [minutes, setMinutes] = useState(alarmProfile.minutes);
	const [difficulty, setDifficulty] = useState(alarmProfile.difficulty);
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const cancelRef = useRef();
	const currentDateTime = new Date();
	const alarmSound = new Audio(Sound); // insert audio file
	const time = `${alarmProfile.hour} : ${alarmProfile.minutes}`;
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

	const checkAlarm = () => {
		return currentDateTime.getHours().toString() === alarmProfile.hour.toString() && currentDateTime.getMinutes().toString() === alarmProfile.minutes.toString();
	}

	console.log(alarmProfile);
	const deleteAlarm = () => {
		const newList = alarmList.filter((item) => item.alarmId.toString() !== alarmId.toString());
		setAlarmList(newList);
	}

	useEffect(() => {
		setAlarmProfile(props);
	}, [props])

	if (checkAlarm()) {
		alarmSound.play();
		alarmSound.loop = true;
	}

	return (
		<ChakraProvider>
			<HStack w='80%'>
				<HStack w='70%' spacing={8}>
					<VStack>
						<Text color='#FFF' fontSize='4xl' as='b'>{time}</Text>
					</VStack>
					<Box>
						<Badge colorScheme='purple' fontSize='md'>{alarmProfile.difficulty}</Badge>
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
									<Select w='100%' onChange={e => {setDifficulty(e)}}>
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