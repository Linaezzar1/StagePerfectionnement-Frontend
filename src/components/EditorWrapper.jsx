import { Box, ChakraProvider } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import theme from './theme';
import backgroundImage from '../imgs/R.jpg'
import { useRef } from 'react';



const EditorWrapper = () => {
  const editorRef = useRef();

  return (
   
    <ChakraProvider theme={theme} >
    <Box minH="100vh" w="100vw"  bgImage={`url(${backgroundImage})`} 
        bgSize="cover"
        bgPosition="center" color="white" px={6} py={8}>
      <CodeEditor  ref={editorRef} />
    </Box>
    </ChakraProvider>
  );
};

export default EditorWrapper;