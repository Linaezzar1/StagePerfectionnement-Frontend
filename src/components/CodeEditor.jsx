import { Box, HStack } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
import * as monaco from 'monaco-editor';
import { languages } from 'monaco-editor';
import Linting from './Linting';
import { Button } from '@mui/material';
import prettier from 'prettier';
import { editor, KeyMod, KeyCode } from 'monaco-editor';

const setupCustomTheme = () => {
  monaco.editor.defineTheme('myCustomTheme', {
    base: 'vs-dark', // ou 'vs' pour le thème clair
    inherit: true,
    rules: [
      { token: 'comment', foreground: 'ffa500', fontStyle: 'italic' }, // Commentaires en orange
      { token: 'keyword', foreground: '00ff00' }, // Mots-clés en vert
    ],
    colors: {
      'editor.background': '#1e1e1e', // Fond de l'éditeur
      'editor.foreground': '#ffffff', // Texte principal
    },
  });

  // Appliquer le thème
  monaco.editor.setTheme('myCustomTheme');
};

const setupSnippets = () => {
  languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: () => {
      return {
        suggestions: [
          {
            label: 'log', // Texte affiché dans la liste de suggestions
            kind: languages.CompletionItemKind.Snippet, // Type de suggestion
            insertText: 'console.log(${1:message});', // Snippet à insérer
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Log a message to the console', // Description
          },
        ],
      };
    },
  });
};

const CodeEditor = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const editorRef = useRef();

  useEffect(() => {
    setupCustomTheme();
    setupSnippets();
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const formatCode = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      const code = model.getValue();
      try {
        const formattedCode = prettier.format(code, {
          parser: 'babel',
          plugins: [require('prettier/parser-babel')],
        });
        model.setValue(formattedCode);
      } catch (error) {
        console.error('Error formatting code:', error);
      }
    }
  };

  React.useEffect(() => {
    const disposable = editorRef.current.addCommand(KeyMod.CtrlCmd | KeyCode.Enter, () => {
      const code = editorRef.current.getModel().getValue();
      console.log('Running code:', code);
      // Exécuter le code ici
    });

    return () => disposable.dispose();
  }, []);

  const debugCode = () => {
    const code = editorRef.current.getModel().getValue();
    eval(code); 
  };
  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Button onClick={formatCode} colorScheme="blue" mb={4}>
            Format Code
          </Button>
          <Button onClick={debugCode} colorScheme="red" mb={4}>
            Debug Code
          </Button>
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
        <Output editorRef={editorRef} language={language} />
      </HStack>
      <Linting editorRef={editorRef} />
    </Box>
  );
};

export default CodeEditor;