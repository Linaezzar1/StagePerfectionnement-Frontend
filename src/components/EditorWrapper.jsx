import { Box, ChakraProvider } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import theme from './theme';
import backgroundImage from '../imgs/R.jpg'
import { useRef } from 'react';
import FileExplorer from './FileExplorer';


const EditorWrapper = () => {
  const editorRef = useRef();

  const files = [
    { name: 'script.js', content: 'console.log("Hello, World!");', language: 'javascript' },
    { name: 'style.css', content: 'body { background: #000; }', language: 'css' },
  ];
  return (
   
    <ChakraProvider theme={theme} >
    <Box minH="100vh" w="100vw"  bgImage={`url(${backgroundImage})`} 
        bgSize="cover"
        bgPosition="center" color="white" px={6} py={8}>
          <FileExplorer files={files} editorRef={editorRef} />
      <CodeEditor  ref={editorRef} />
    </Box>
    </ChakraProvider>
  );
};

export default EditorWrapper;