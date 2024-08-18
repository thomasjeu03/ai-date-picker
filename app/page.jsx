"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {useState} from "react";
import axios from 'axios';

export default function Home() {
    const [textInput, setTextInput] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/convert-date', { text: textInput });
            setDateTime(response.data.dateTime);
        } catch (err) {
            setError('Error processing the date');
        }
    };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
        <h1 className="text-2xl font-bold">DateTime Converter</h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
                <Label htmlFor="textInput">Enter time description:</Label>
                <Input
                    type="text"
                    id="textInput"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Ex: 'tomorow at 2am', 'in 2 days' or 'September the 10th' "
                />
            </div>
            <Button type="submit">Convert</Button>
        </form>
        {dateTime && (
            <div className="mt-4 w-full">
                <Label htmlFor="dateTimeOutput">Converted DateTime:</Label>
                <Input
                    type="datetime-local"
                    id="dateTimeOutput"
                    value={dateTime}
                    readOnly
                />
            </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}
