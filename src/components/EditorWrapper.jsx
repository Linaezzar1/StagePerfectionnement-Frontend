import { Box } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';


const EditorWrapper = () => {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray" px={6} py={8}>
      <CodeEditor />
    </Box>
  );
};

export default EditorWrapper;