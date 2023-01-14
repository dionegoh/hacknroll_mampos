import './App.css';
import AddAlarmButton from './components/AddAlarmButton';
import Alarm from './components/alarm';
import Clock from './components/clock';
import DateTimeString from './components/datetimestring';
import { Grid, GridItem } from '@chakra-ui/react'


function App() {
  return (
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
        <Alarm hour='17' minutes='42' difficulty='easy'/>
      </GridItem>

      <GridItem colSpan={1} rowSpan={4} textAlign={'center'}>
        <DateTimeString></DateTimeString>
     </GridItem>
    </Grid>
            

  );
}

export default App;
