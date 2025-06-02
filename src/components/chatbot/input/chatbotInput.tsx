import React, { useRef } from 'react';

interface i_Props {
    search: (keyWord: string) => void;
}

const chatbotInput: React.FC<i_Props> = (props) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const doSearch = () => {
        if (inputRef.current!.value === '') {
            return;
        }
        props.search(inputRef.current!.value);
        inputRef.current!.value = '';
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && inputRef.current!.value.trim().length > 0) {
            e.preventDefault();
            e.stopPropagation();
            doSearch();
            inputRef.current!.value = '';
        }
    };

    return (
        <div className="conversation-input-container">
            <textarea
                id="chatbot_input"
                aria-label="give me your words"
                ref={inputRef}
                onKeyDown={(e: React.KeyboardEvent) => {
                    handleKeyDown(e);
                }}
            ></textarea>
            <div className="input-options">
                <button className="clear" aria-label="clear input" onClick={() => (inputRef.current!.value = '')}></button>
                <button className="voice-input" aria-label="press it to do voice input"></button>
                <button title="search" className="search" aria-label="send your inputs" onClick={() => doSearch()}></button>
            </div>
        </div>
    );
};
export default chatbotInput;
