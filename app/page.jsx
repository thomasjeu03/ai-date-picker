"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useState} from "react";
import axios from 'axios';
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TextEditor from "@/app/components/TextEditor";

export default function Home() {
    const [textInput, setTextInput] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Ajout de l'état de chargement

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('/api/convert-date', { text: textInput });
            setMessage(response.data.message);
        } catch (err) {
            setError('Error processing the message');
        } finally {
            setLoading(false)
        }
    };

  return (
    <main className="flex min-h-screen max-w-4xl mx-auto flex-col items-center gap-6 px-4 py-4 tiptap">
        {/*<form onSubmit={handleSubmit} className="w-full flex flex-row gap-3 max-w-lg">*/}
        {/*    <div className="w-full">*/}
        {/*        <Input*/}
        {/*            type="text"*/}
        {/*            id="textInput"*/}
        {/*            value={textInput}*/}
        {/*            onChange={(e) => setTextInput(e.target.value)}*/}
        {/*            placeholder="Ask something..."*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <Button type="submit"> {loading ? ('Generated...') : ('Send')}</Button>*/}
        {/*</form>*/}
        {/*{error && <p className="text-red-500 w-full max-w-lg">{error}</p>}*/}
        {/*{loading ? (*/}
        {/*    <p className="text-gray-400 w-full max-w-lg">Generated...</p>*/}
        {/*) : (*/}
        {/*    <MarkdownRenderer message={message} />*/}
        {/*)}*/}

        <TextEditor />
    </main>
  );
}
