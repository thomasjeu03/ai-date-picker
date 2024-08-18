import { useEffect, useState } from 'react';
import {markdownToHtml} from "@/lib/markdownToHtml";

function MarkdownRenderer({ message }) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        const convertMarkdown = async () => {
            if (message) {
                const htmlContent = await markdownToHtml(message);
                setHtml(htmlContent);
            }
        };
        convertMarkdown();
    }, [message]);

    return (
        <div
            className='text-fuchsia-900 w-full max-w-lg'
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

export default MarkdownRenderer;