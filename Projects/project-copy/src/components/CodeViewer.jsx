import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeViewer.css';

const CodeViewer = ({ code }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="code-viewer">
      <button className="code-toggle" onClick={() => setExpanded(prev => !prev)}>
        {expanded ? 'Hide code' : 'Show code'}
      </button>
      <div className={`code-panel ${expanded ? 'expanded' : 'collapsed'}`}>
        <SyntaxHighlighter language="javascript" style={solarizedDarkAtom} showLineNumbers>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeViewer;
