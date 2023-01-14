import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import Overlay from './components/math-overlay/overlay'
import { Button, Modal, ModalOverlay } from '@chakra-ui/react';

import React from 'react';

function App() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen)
  }

  return (
    <ChakraProvider>
      <Button onClick={toggleOverlay}>
            Open Modal
        </Button>
      <Modal
          isOpen={isOverlayOpen}
          toggleOverlay={toggleOverlay}
          // onClose={toggleOverlay}
        >
          <ModalOverlay>
            <Overlay
              toggleOverlay={toggleOverlay}
              >
              </Overlay>
          </ModalOverlay>
        </Modal>
    </ChakraProvider>
  );
}



export default App;
