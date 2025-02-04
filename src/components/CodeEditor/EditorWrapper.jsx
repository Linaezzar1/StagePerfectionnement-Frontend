import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import theme from '../theme';
import backgroundImage from '../../imgs/R.jpg'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';



const EditorWrapper = () => {
  const editorRef = useRef();
  const navigate = useNavigate();

  return (
    <div>
      
    <ChakraProvider theme={theme} >
       
      <Box minH="100vh" w="100vw"

        backgroundColor={'whiteAlpha.400'} color="white" px={6} py={8}>
         
        <Box className="editor-container">
          <CodeEditor ref={editorRef} />
        </Box>
        
        
      </Box>
    </ChakraProvider>
   

    </div>
  );
};

export default EditorWrapper;