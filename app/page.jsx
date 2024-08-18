"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useState} from "react";
import axios from 'axios';

export default function Home() {
    const [textInput, setTextInput] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/convert-date', { text: textInput });
            setMessage(response.data.message);
        } catch (err) {
            setError('Error processing the message');
        }
    };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-8 justify-center">
        <h1 className="text-2xl font-bold">IA du gheto</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-row gap-3 max-w-lg">
            <div className="w-full">
                <Input
                    type="text"
                    id="textInput"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Ask something..."
                />
            </div>
            <Button type="submit">Send</Button>
        </form>
        {message && (
            <p className='text-fuchsia-900 w-full'>{message}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}
