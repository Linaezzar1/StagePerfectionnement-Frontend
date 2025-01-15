import { Box, ChakraProvider } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import theme from './theme';
import backgroundImage from '../imgs/R.jpg'


const EditorWrapper = () => {
  return (
   
    <ChakraProvider theme={theme} >
    <Box minH="100vh" w="100vw"  bgImage={`url(${backgroundImage})`} 
        bgSize="cover"
        bgPosition="center" color="white" px={6} py={8}>
          
      <CodeEditor />
    </Box>
    </ChakraProvider>
  );
};

export default EditorWrapper;