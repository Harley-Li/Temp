import useSpeechRecognition from '../../hooks/useSpeechRecognition';

const Chatbot: React.FC = () => {
    const { transcript, isListening, startListening, stopListening, isBrowserSupported } = useSpeechRecognition();

    return (
        <div>
            {!isBrowserSupported && <p>Speech recognition is not supported in this browser.</p>}
            <h2>Speech Input Example</h2>
            {isListening && <p>Listening...</p>}
            <p>Transcript: {transcript}</p>
            <button onClick={startListening}>Start Listening</button>
            <button onClick={stopListening}>Stop Listening</button>
        </div>
    );
};

export default Chatbot;
