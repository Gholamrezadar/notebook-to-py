// @ts-nocheck
import SyntaxHighlighter from 'react-syntax-highlighter';
import { irBlack } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodeBlock = ({ codeString }) => {
    return (
        <SyntaxHighlighter language="python" style={irBlack} showLineNumbers={true} customStyle={{width: "100%"}}>
            {codeString}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;