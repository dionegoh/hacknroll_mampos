import logo from './logo.svg';
import './App.css';
import Clock from './components/clock';
import { Grid, GridItem } from '@chakra-ui/react'

function App() {
  return (
    <Grid h="100vh" 
          templateColumns='repeat(2, 1fr)'
          templateRows='repeat(5, 1fr)'
          gap={4}>
      <GridItem colSpan={1} rowSpan={4} >
        <Clock></Clock>
      </GridItem>
      <GridItem colSpan={1}>
     </GridItem>
    </Grid>
            

  );
}

export default App;
