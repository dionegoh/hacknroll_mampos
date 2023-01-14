import './App.css';
import AddAlarmButton from './components/AddAlarmButton';
import Alarm from './components/Alarm';
import Clock from './components/clock';
import DateTimeString from './components/datetimestring';
import { Grid, GridItem, VStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import AlarmContext from './AlarmContext';


function App() {
	const [alarmList, setAlarmList] = useState([]);
	const [alarmId, setAlarmId] = useState(1);

	return (
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
	);
}

export default App;
