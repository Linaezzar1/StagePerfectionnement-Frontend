import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = ({ onCommand }) => {
  const terminalRef = useRef(null);
  const term = useRef(null);

  useEffect(() => {

    if (!terminalRef.current) {
      console.error("Le conteneur du terminal n'est pas encore monté.");
      return;
    }
    const fitAddon = new FitAddon();
    term.current = new Terminal({
      cursorBlink: true,
      scrollback: 1000,
      theme: {
        background: '#000000',
        foreground: '#ffffff',
      },
      allowProposedApi: true,
    });
  
    term.current.loadAddon(fitAddon);
    term.current.open(terminalRef.current);
    fitAddon.fit();
    term.current.focus();
  
    term.current.write('Bienvenue dans le terminal \r\n$ ');

    let currentLine = '';
  
     term.current.onData((data) => {
      if (data === '\r') { // Touche "Entrée"
        const command = currentLine.trim();
        currentLine = '';

        if (command) {
          onCommand(command).then((result) => {
            term.current.write(`\r\n${result || ''}\r\n$ `);
          });
        } else {
          term.current.write('\r\n$ ');
        }
      } else if (data === '\x7F') { // Touche "Backspace"
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.current.write('\b \b');
        }
      } else {
        currentLine += data;
        term.current.write(data);
      }
    });

    return () => {
      term.current.dispose();
    };
  }, [onCommand]);

  return <div ref={terminalRef} style={{ width: '100%', height: '400px', backgroundColor: '#000' }} />;
};

export default TerminalComponent;
