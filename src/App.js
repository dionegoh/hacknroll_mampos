import './App.css';
import AddAlarmButton from './components/AddAlarmButton';
import Alarm from './components/alarm';
import Clock from './components/clock';
import DateTimeString from './components/datetimestring';
import { Box, Flex, Grid, GridItem, VStack, Text } from '@chakra-ui/react'
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
					<VStack flexWrap='wrap'>
            <Box h='132px' w='100%'></Box>
            <Flex w='100%' justifyContent='flex-start'>
              <Box w='10%'></Box>
              <AddAlarmButton />
            </Flex>
  
              {(alarmList.length == 0) && <Text color='#fff' paddingTop='16px'>No alarms added yet!</Text>
  }
              {(alarmList.length > 0) && alarmList.map((item) => (
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
