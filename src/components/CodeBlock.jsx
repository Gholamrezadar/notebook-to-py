// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { irBlack } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

// Load only required languages
// Don't forget to change /esm to /cjs
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import irBlack from 'react-syntax-highlighter/dist/cjs/styles/hljs/irBlack';

SyntaxHighlighter.registerLanguage('python', python);

const CodeBlock = ({ codeString }) => {
    return (
        <SyntaxHighlighter language="python" style={irBlack} showLineNumbers={true} customStyle={{width: "100%"}}>
            {codeString}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;
