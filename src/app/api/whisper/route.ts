import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file found' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY!,
        });

        const response = await openai.audio.transcriptions.create({
            file,
            model: 'gpt-4o-transcribe',
        });

        return NextResponse.json({ text: response.text });
    } catch (error) {
        console.error('Transcription error:', error);
        return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
    }
}
