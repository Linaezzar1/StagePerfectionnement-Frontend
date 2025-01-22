import { Box, Button, HStack } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
import { useLocation } from 'react-router-dom';
import { updateFile , addFile } from '../Services/FileService';

const CodeEditor = () => {
  const location = useLocation();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const editorRef = useRef();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (location.state?.file) {
      const { content } = location.state.file;
      setValue(content || '');
      setFile(location.state.file); // Conserve les infos du fichier
    }
  }, [location.state]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleSaveOrUpdate = async () => {
    const content = editorRef.current.getValue();
    try {
      if (file) {
        const updatedFile = await updateFile(file._id, content);
        alert(`Fichier mis à jour : ${updatedFile.name}`);
      } else {
        const newFile = await addFile(`File_${Date.now()}`, content);
        alert(`Fichier sauvegardé : ${newFile.name}`);
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Échec de la sauvegarde ou mise à jour');
    }
  };


  return (
    <Box>
      
      <HStack spacing={4}>
      
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />  
          <Editor
            options={{
              minimap: {
                enabled: true,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>

        <Button colorScheme="blue" mt={4} onClick={handleSaveOrUpdate}>
          {file ? 'Update' : 'Save'}
        </Button>
        <Output editorRef={editorRef} language={language} />

      </HStack>


    </Box>
  );
};

export default CodeEditor;