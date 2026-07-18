import React, { useState } from 'react';
import './Code.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';
import items from '../SectionStor2.js';

const Code2 = ({ index }) => {
  const [height, setHeight] = useState('0');
  const [overflow, setOverflow] = useState('hidden');

  const toggleHeight = () => {
    setHeight(height === '0' ? '90vh' : '0');
    setOverflow(overflow === 'hidden' ? 'auto' : 'hidden');
  };

  return (
    <div className="code-bubble" >
      <button onClick={toggleHeight}> {height === '0' ? 'Show' : "Don't Show"}</button>
      <div style={{ height, overflow}}>
     <SyntaxHighlighter language="javascript" style={solarizedDarkAtom}>
        {items[index]}
      </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Code2;