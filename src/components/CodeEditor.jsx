import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
import { useLocation } from 'react-router-dom';
import { updateFile, addFile } from '../Services/FileService';

const CodeEditor = () => {
  const location = useLocation();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const editorRef = useRef();
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleEditorChange = (value) => {
    setValue(value); // Met à jour l'état local
    // Envoyer la modification via WebSocket
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ content: value }));
    }
  };


  useEffect(() => {
    const connectWebSocket = () => {
      socketRef.current = new WebSocket('ws://localhost:3000');
      socketRef.current.onopen = () => {
        setIsConnected(true);
        console.log('Connexion WebSocket ouverte');
      };
      socketRef.current.onerror = (error) => console.error('Erreur WebSocket :', error);
      socketRef.current.onmessage = (event) => {
        try {
          const { content } = JSON.parse(event.data);
          if (typeof content === 'string') {
            setValue(content);
          }
        } catch (error) {
          console.error('Erreur lors du parsing du message WebSocket :', error);
        }
      };
      socketRef.current.onclose = () => {
        setIsConnected(false);
        console.warn('Connexion WebSocket fermée. Tentative de reconnexion...');
        setTimeout(connectWebSocket, 3000); // Réessaie après 3 secondes
      };
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);


  useEffect(() => {
    if (location.state?.file) {
      const { content } = location.state.file;
      setValue(content || '');
      setFile(location.state.file); // Conserve les infos du fichier
      setLanguage(location.state.file.language);


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
    setIsSaving(true);
    try {
      if (file) {
        const updatedFile = await updateFile(file._id, content, language);
        alert(`Fichier mis à jour : ${updatedFile.name}`);
      } else {
        const newFile = await addFile(`File_${Date.now()}`, content, language);
        alert(`Fichier sauvegardé : ${newFile.name}`);
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Échec de la sauvegarde ou mise à jour');
    } finally {
      setIsSaving(false); // Terminer la sauvegarde
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
            onChange={(value) => { setValue(value); handleEditorChange(value) }}
          />
        </Box>

        <Button colorScheme="blue" mt={4} onClick={handleSaveOrUpdate} isLoading={isSaving}>
          {file ? 'Update' : 'Save'}
        </Button>
        <Output editorRef={editorRef} language={language} />

      </HStack>
      <Text color={isConnected ? 'green' : 'red'}>
        {isConnected ? 'WebSocket Connecté' : 'WebSocket Déconnecté'}
      </Text>


    </Box>
  );
};

export default CodeEditor;