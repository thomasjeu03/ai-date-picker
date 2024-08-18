import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import axios from 'axios';

dotenv.config();

export async function POST(request) {
    const { text } = await request.json();

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: `Convert the following text into a date and time: "${text}"`,
                max_tokens: 50,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const dateTimeString = response.data.choices[0].text.trim();
        const date = new Date(dateTimeString);

        if (isNaN(date.getTime())) {
            return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
        }

        return NextResponse.json({ dateTime: date.toISOString().slice(0, 16) });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}