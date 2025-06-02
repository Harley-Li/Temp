import ChatbotInput from './input/chatbotInput';
import ConversationSection from './ConversationSection';
import axios from 'axios';
import './chatbotContainer.scss';
import React, { useState, useEffect } from 'react';

interface chatItem {
    content: string;
    role: string;
}

const ChatbotContainer: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<chatItem[]>([{ content: `Hey, welcome to Harley's ChatBot.`, role: 'ai' }]);

    const callChatbot = async (keyWord: string) => {
        setChatHistory([...chatHistory, { content: keyWord, role: 'user' }, { content: '', role: 'ai thinking' }]);
        let tempArray = [...chatHistory, { content: keyWord, role: 'user' }, { content: '', role: 'ai thinking' }];
        const req_header = {
            headers: {
                Authorization: 'Bearer sk-uytbtrkfuxkdsckiulqhhtpcvnrobsfaaiydbjmlwdsrldhu',
                'Content-Type': 'application/json',
            },
        };
        const req_body = { model: 'deepseek-ai/DeepSeek-R1-Distill-Llama-8B', messages: [{ content: keyWord, role: 'user' }] };
        const res = await axios.post('https://api.siliconflow.cn/v1/chat/completions', req_body, req_header);
        tempArray[tempArray.length - 1] = { content: res.data.choices[0].message.content, role: 'ai' };
        setChatHistory(tempArray);

        const utterance = new SpeechSynthesisUtterance(res.data.choices[0].message.content);
        utterance.voice = window.speechSynthesis.getVoices()[0];
        utterance.rate = 1.0; // 设置语音速度
        utterance.pitch = 1.0; // 设置语音音调
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="chatbot-container">
            <div className="conversation-list">
                <ConversationSection history={chatHistory} />
            </div>
            <ChatbotInput search={callChatbot}></ChatbotInput>
        </div>
    );
};

export default ChatbotContainer;
