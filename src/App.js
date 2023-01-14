import logo from './logo.svg';
import './App.css';
import Clock from './components/clock';
import DateTimeString from './components/datetimestring';
import { Grid, GridItem } from '@chakra-ui/react'

function App() {
  return (
    <Grid h="100vh" 
          templateColumns='repeat(3, 1fr)'
          templateRows='repeat(10, 1fr)'
          gap={4}>
      <GridItem colSpan={1} rowSpan={6} >
        <Clock></Clock>
      </GridItem>
      <GridItem colSpan={2} rowSpan={10} bg='tomato' >
      </GridItem>

      <GridItem colSpan={1} rowSpan={4} textAlign={'center'}>
        <DateTimeString></DateTimeString>
     </GridItem>
    </Grid>
            

  );
}

export default App;
