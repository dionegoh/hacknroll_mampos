import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { Button, Modal, ModalOverlay, Grid, GridItem, VStack, Text } from '@chakra-ui/react';

import AddAlarmButton from './components/AddAlarmButton';
import Alarm from './components/Alarm';
import Clock from './components/clock';
import Overlay from './components/math-overlay/overlay'
import DateTimeString from './components/datetimestring';
import AlarmContext from './AlarmContext';

import React from 'react';

function App() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen)
  }

  return (
    <ChakraProvider>
		<AlarmContext.Provider
			value={{
				alarmId: alarmId,
				setAlarmId: setAlarmId,
				alarmList: alarmList,
				setAlarmList: setAlarmList
			}}>
			<Grid h="100vh"
				templateColumns='repeat(3, 1fr)'
				templateRows='repeat(10, 1fr)'
				gap={4}
				bg='#282c34'>
				<GridItem colSpan={1} rowSpan={6} >
					<Clock></Clock>
				</GridItem>
				<GridItem colSpan={2} rowSpan={10} >
					<AddAlarmButton />
					<VStack>
						<Text>Alarm List:</Text>
						{alarmList.map((item) => (
							<Alarm hour={item.hour} minutes={item.minutes} difficulty={item.difficulty} alarmId={item.alarmId} />
						))}
					</VStack>
				</GridItem>

				<GridItem colSpan={1} rowSpan={4} textAlign={'center'}>
					<DateTimeString></DateTimeString>
				</GridItem>
			</Grid>
		</AlarmContext.Provider>

		{/* <Button onClick={toggleOverlay}>
				Open Modal
			</Button>
		<Modal
			isOpen={isOverlayOpen}
			toggleOverlay={toggleOverlay}
			>
			<ModalOverlay>
				<Overlay
				toggleOverlay={toggleOverlay}
				>
				</Overlay>
			</ModalOverlay>
			</Modal> */}
		</ChakraProvider>
  );
}

export default App;
