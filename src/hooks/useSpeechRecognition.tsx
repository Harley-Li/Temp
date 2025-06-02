import { useState, useEffect } from 'react';

let recognition = new webkitSpeechRecognition() || new SpeechRecognition();

if (recognition) {
    recognition.continuous = true;
    recognition.lang = 'en-US';
}

const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const result = event.results[0][0].transcript;
            setTranscript(result);
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
        };
    }, []);

    const startListening = () => {
        setTranscript('');
        recognition.start();
        setIsListening(true);
    };

    const stopListening = () => {
        recognition.stop();
        setIsListening(false);
    };

    return {
        transcript,
        isListening,
        startListening,
        stopListening,
        isBrowserSupported: !!recognition,
    };
};

export default useSpeechRecognition;
