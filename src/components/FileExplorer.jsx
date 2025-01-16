import { Box } from '@chakra-ui/react';
import { editor } from 'monaco-editor';

const FileExplorer = ({ files, editorRef }) => {
  const handleFileClick = (file) => {
    const model = editor.createModel(file.content, file.language);
    editorRef.current.setModel(model);
  };

  return (
    <Box bg="#1e1e1e" color="white" p={2} width="200px">
      {files.map((file) => (
        <Box key={file.name} onClick={() => handleFileClick(file)} cursor="pointer" p={1}>
          {file.name}
        </Box>
      ))}
    </Box>
  );
};

export default FileExplorer;