// import ChatbotInput from './input/chatbotInput'; // Removed import
import ConversationSection from './ConversationSection';
// import axios from 'axios'; // Commented out as it's not used in simulated chat
import './chatbotContainer.scss';
import React, { useState, useRef, useEffect } from 'react';

interface chatItem {
    content: string;
    role: string;
}

interface i_quick_reply {
    name: string;
    func: string;
}

interface i_msg {
    content: string;
    role: 'user' | 'ai';
    quick_reply: i_quick_reply[];
    ui_component: string;
}

const sampleChatMessages: i_msg[] = [
    // === Turn 1 ===
    {
        content: "Hey Sarah! Welcome back. I noticed that there's been an increase in your income. Congratulations on that achievement! It might be a good time to review your retirement plan and see if any adjustments could better align with your new financial situation. Would you like to discuss this?",
        role: "ai",
        quick_reply: [
            { name: "Yes, let's discuss", func: "discuss_adjustments" },
            { name: "No, not right now", func: "decline_discussion" },
            { name: "Tell me more first", func: "more_info_initial" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "Yes, I think that would be a good idea. What kind of adjustments do you suggest?",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 2 ===
    {
        content: "Given the increase in your income, we might consider a few options. One possibility is increasing your contributions to your retirement plan. This can help you take advantage of compound growth and potentially secure a more comfortable retirement. We could also review your investment portfolio to ensure it aligns with your risk tolerance and retirement goals. To better support you, may I know what your concerns are about increasing contributions?",
        role: "ai",
        quick_reply: [
            { name: "Explain increasing contributions", func: "explain_contributions" },
            { name: "Review investment portfolio", func: "review_portfolio" },
            { name: "I have some concerns", func: "voice_concerns_contributions" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "Increasing contributions sounds sensible, can you explain more?",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    }
];

const ChatbotContainer: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<chatItem[]>([]);
    const [currentQuickReplies, setCurrentQuickReplies] = useState<i_quick_reply[]>([]);
    const currentDialogueStepRef = useRef<number>(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const THINKING_MESSAGE_CONTENT = "AI is thinking..."; // English thinking message

    // Define min and max delay for AI thinking simulation
    const MIN_THINKING_DELAY = 1500; // 1.5 seconds
    const MAX_THINKING_DELAY = 4000; // 4 seconds

    useEffect(() => {
        if (sampleChatMessages.length > 0) {
            const firstMessage = sampleChatMessages[0];
            if (firstMessage.role === 'ai') {
                setChatHistory([{ content: firstMessage.content, role: firstMessage.role }]);
                currentDialogueStepRef.current = 0; // This AI message (index 0) is now active
                if (firstMessage.quick_reply && firstMessage.quick_reply.length > 0) {
                    setCurrentQuickReplies(firstMessage.quick_reply);
                    if (inputRef.current) inputRef.current.value = ''; // Clear textarea if quick replies are shown
                } else {
                    // No quick replies for the first AI msg, try to prefill next user message
                    const nextMessageIndex = 1;
                    if (sampleChatMessages.length > nextMessageIndex && 
                        sampleChatMessages[nextMessageIndex].role === 'user' && 
                        inputRef.current
                    ) {
                        inputRef.current.value = sampleChatMessages[nextMessageIndex].content;
                        currentDialogueStepRef.current = nextMessageIndex; // Advance to this prefilled user message
                    }
                }
            } else if (firstMessage.role === 'user' && inputRef.current) {
                // Script starts with a user message (less common for initial load)
                inputRef.current.value = firstMessage.content;
                currentDialogueStepRef.current = 0;
            }
        }
    }, []);

    const processAiTurn = (aiMessageIndex: number) => {
        if (aiMessageIndex < sampleChatMessages.length && sampleChatMessages[aiMessageIndex]?.role === 'ai') {
            const aiMessageObject = sampleChatMessages[aiMessageIndex];
            const thinkingMessage: chatItem = { content: THINKING_MESSAGE_CONTENT, role: 'ai' };
            setChatHistory(prev => [...prev, thinkingMessage]);
            const randomDelay = Math.floor(Math.random() * (MAX_THINKING_DELAY - MIN_THINKING_DELAY + 1)) + MIN_THINKING_DELAY;

            setTimeout(() => {
                setChatHistory(prev => prev.filter(msg => msg.content !== THINKING_MESSAGE_CONTENT));
                setChatHistory(prev => [...prev, { content: aiMessageObject.content, role: aiMessageObject.role }]);
                
                currentDialogueStepRef.current = aiMessageIndex; // This AI message is now the active one

                if (aiMessageObject.quick_reply && aiMessageObject.quick_reply.length > 0) {
                    setCurrentQuickReplies(aiMessageObject.quick_reply);
                    if (inputRef.current) inputRef.current.value = ''; // Clear textarea
                } else {
                    setCurrentQuickReplies([]); // Ensure no old quick replies linger
                    const nextUserMessageIndex = aiMessageIndex + 1;
                    if (nextUserMessageIndex < sampleChatMessages.length && 
                        sampleChatMessages[nextUserMessageIndex]?.role === 'user' && 
                        inputRef.current
                    ) {
                        inputRef.current.value = sampleChatMessages[nextUserMessageIndex].content;
                        currentDialogueStepRef.current = nextUserMessageIndex; // Advance to this prefilled user message
                    } else {
                        if (inputRef.current) inputRef.current.value = ''; // No user message to prefill, or end of script
                        // If it's the end of script, currentDialogueStepRef might be left at the last AI index
                    }
                }
            }, randomDelay);
        } else {
            setChatHistory(prev => {
                const lastMessageContent = "The scripted dialogue has ended. Thanks for chatting!";
                const lastHistoryMsg = prev[prev.length -1];
                if (!lastHistoryMsg || lastHistoryMsg.content !== lastMessageContent) {
                    return [...prev, { content: lastMessageContent, role: 'ai' }];
                }
                return prev;
            });
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const handleUserSubmit = (userInput: string, isFromQuickReply: boolean) => {
        setChatHistory(prev => [...prev, { content: userInput, role: 'user' }]);
        setCurrentQuickReplies([]); // Clear quick replies as soon as user makes a choice or types
        if (inputRef.current) inputRef.current.value = ''; // Clear textarea after submission

        let nextAiResponseIndex: number;
        const currentStep = currentDialogueStepRef.current; 

        if (isFromQuickReply) {
            // currentStep is the index of the AI message that offered the quick replies.
            // The scripted user message at currentStep + 1 is skipped.
            nextAiResponseIndex = currentStep + 2; 
        } else {
            // User typed. 
            // Check if the user was responding to an AI message that had quick replies (currentStep would be AI index)
            // or if it was a pre-filled user prompt (currentStep would be user index)
            const messageAtCurrentStep = sampleChatMessages[currentStep];
            if(messageAtCurrentStep?.role === 'ai' && messageAtCurrentStep?.quick_reply?.length > 0){
                 // User typed when AI at currentStep offered QR. Scripted user at currentStep+1 is skipped.
                 nextAiResponseIndex = currentStep + 2;
            } else {
                // Standard: user typed after a pre-filled prompt (currentStep was user index) or after AI with no QR.
                nextAiResponseIndex = currentStep + 1;
            }
        }
        processAiTurn(nextAiResponseIndex);
    };

    const handleQuickReplyClick = (reply: i_quick_reply) => {
        handleUserSubmit(reply.name, true);
    };

    const doSearch = () => {
        if (inputRef.current && inputRef.current.value.trim() === '') return;
        if (inputRef.current) {
            // If user types while quick replies were visible, this submission overrides them.
            // isFromQuickReply is false.
            handleUserSubmit(inputRef.current.value, false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && inputRef.current && inputRef.current.value.trim().length > 0) {
            e.preventDefault();
            doSearch();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="conversation-list">
                <ConversationSection history={chatHistory} />
            </div>
            {currentQuickReplies.length > 0 && (
                <div className="quick-replies-container">
                    {currentQuickReplies.map((reply, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleQuickReplyClick(reply)} 
                            className="quick-reply-button"
                        >
                            {reply.name}
                        </button>
                    ))}
                </div>
            )}
            <div className="conversation-input-container">
                <textarea
                    id="chatbot_input"
                    aria-label="give me your words"
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                        // If user starts typing and quick replies are visible, clear them
                        // to indicate that typing will override the quick reply suggestions.
                        if (currentQuickReplies.length > 0 && e.target.value.length > 0) {
                            setCurrentQuickReplies([]);
                        }
                    }}
                    rows={4}
                ></textarea>
                <div className="input-options">
                    <button title="search" className="search" aria-label="send your inputs" onClick={doSearch}></button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotContainer;
