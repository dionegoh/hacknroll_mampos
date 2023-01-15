import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import AddAlarmButton from './components/AddAlarmButton';
import Alarm from './components/alarm';
import Clock from './components/clock';
import DateTimeString from './components/datetimestring';
import { Badge, Box, Flex, Grid, GridItem, VStack, Text } from '@chakra-ui/react'
import AlarmContext from './AlarmContext';

import React from 'react';

function App() {
	const [alarmList, setAlarmList] = useState([]);
	const [alarmId, setAlarmId] = useState(1);
	
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
				templateRows='repeat(11, 1fr)'
				gap={4}
				bg='#282c34'>
        <GridItem paddingTop={16} paddingLeft='10%' colSpan={3} rowSpan={1}> 
           <Flex alignItems='center' h='100%'>
            <Text padding={2} bg='black' fontSize='24px' textColor={'#fff'}  as='b' borderRadius={'16px'}> Annoy'o Clock </Text>
           </Flex>
        </GridItem>
				<GridItem colSpan={1} rowSpan={6} >
					<Clock></Clock>
				</GridItem>
				<GridItem colSpan={2} rowSpan={10} >
					<VStack flexWrap='wrap' spacing='8px'>
            <Box h='64px' w='100%'></Box>
            <Flex w='100%' justifyContent='flex-start'>
              <Box w='10%'></Box>
              <AddAlarmButton/>
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
		</ChakraProvider>
  	);
}

export default App;
