import React from 'react';
import './Code.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedDarkAtom} from 'react-syntax-highlighter/dist/esm/styles/prism';

const Code1 = () => {
    return (
        <div className="code-bubble">
            <SyntaxHighlighter language="javascript" style={solarizedDarkAtom}>

                {`console.log("Hello World");
                     const name = "eve";
                           console.log(eve);`}
            </SyntaxHighlighter>
        </div>
    )
}

export default Code1