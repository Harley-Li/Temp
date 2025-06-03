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
    },
    // === Turn 3 ===
    {
        content: "Certainly. Before we dive deeper into increasing contributions, could you share any specific concerns you might have about it? This will help me tailor the information for you.",
        role: "ai",
        quick_reply: [
            { name: "Flexibility of funds", func: "concern_flexibility" },
            { name: "Impact on current budget", func: "concern_budget_impact" },
            { name: "No major concerns yet", func: "no_major_concerns" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "One thing I'm a bit worried about is the flexibility of my funds. If I increase my contributions to the retirement plan, will it tie up my money in a way that makes it harder to access if I need it for an unexpected expense or opportunity? I just want to make sure I have enough liquidity to handle any immediate financial needs that might come up.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 4 ===
    {
        content: "I completely understand your concern about flexibility. Taking that into consideration, it's crucial to ensure you have access to funds for any immediate financial needs. Here are a few options: \n1. Emergency Fund \n2. Flexible Retirement Accounts \n3. Balanced Contribution Strategy \n4. Regular Review & Adjustment \n5. Short-term Investments. \nWould you like to explore these options further?",
        role: "ai",
        quick_reply: [
            { name: "Yes, explore these options", func: "explore_flexibility_options" },
            { name: "Tell me about Balanced Strategy", func: "explain_balanced_strategy" },
            { name: "No, that's clear for now", func: "clear_on_flexibility_options" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "What is Balanced contribution strategy specifically about? I may want to try it.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 5 ===
    {
        content: "Cool. The Balanced Contribution Strategy allows strategic fund allocation for retirement and immediate needs. We'd decide contribution percentages based on your situation. For instance, an additional $375 monthly could boost retirement funding by 10%. How does a specific increase like this sound to you?",
        role: "ai",
        quick_reply: [
            { name: "An extra $375 sounds interesting", func: "discuss_375_increase" },
            { name: "How is the 10% calculated?", func: "calculate_10_percent" },
            { name: "I have budget concerns", func: "voice_budget_concerns" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "Thank you for your recommendation. Increasing my monthly contributions by an additional $375 sounds like a substantial step. However, I'm a bit concerned about how this will impact my current budget and day-to-day expenses.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 6 ===
    {
        content: "Got it, no worries. It's important that any increase aligns with your budget. To address your concerns, would you like to review your budget in more detail, or understand precisely how this $375 improves your outlook by 10%?",
        role: "ai",
        quick_reply: [
            { name: "Review budget in detail", func: "review_budget_detailed" },
            { name: "Explain the 10% improvement", func: "explain_10_percent_improvement" },
            { name: "Can we consider a smaller amount?", func: "consider_smaller_amount" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "Could we go over my financial situation in more detail to ensure this increase is manageable? I'd also like to understand more about how this boost will specifically improve my retirement outlook by 10%.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 7 ===
    {
        content: "No problem at all. It's wise to see the big picture. Let's start by reviewing your existing budget to identify areas for adjustment, analyzing essential and discretionary spending. Does that sound like a good next step?",
        role: "ai",
        quick_reply: [
            { name: "Yes, let's review the budget", func: "agree_review_budget_now" },
            { name: "What information do you need?", func: "info_needed_for_budget" },
            { name: "Maybe later", func: "review_budget_later" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "Yeah, I think so. I feel good when I can spend as planned and not feel strain at the same time.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 8 ===
    {
        content: "That's perfect. You follow your plan better than most. I'll provide a detailed breakdown of how the additional $375 contribution will specifically enhance your retirement savings by 10%, including projections. After seeing these details, do you feel it's worth contributing more now for the future?",
        role: "ai",
        quick_reply: [
            { name: "Yes, it seems worth it", func: "confirm_contribution_worth" },
            { name: "I have more questions", func: "more_questions_on_projections" },
            { name: "Show me the breakdown first", func: "show_breakdown_first" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "Yes, the projections look promising. I can try my best to contribute more.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 9 ===
    {
        content: "Haha, cool. If you click apply, we can update the plan accordingly. Are you ready?",
        role: "ai",
        quick_reply: [
            { name: "Yes, I'm ready to apply", func: "apply_plan_changes" },
            { name: "What exactly will be updated?", func: "details_on_update" },
            { name: "Not just yet", func: "not_ready_to_apply" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "Of course.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 10 ===
    {
        content: "Great! Your retirement plan score increases from 75 to 85. You're closer to your dreamed retirement life! Clear communication is key; I'll ensure you understand your plan and are comfortable. We can review and adjust as needed. If questions or changes arise, I'm here to help.",
        role: "ai",
        quick_reply: [
            { name: "That's great news!", func: "acknowledge_score_increase" },
            { name: "How do we review progress?", func: "how_to_review_progress" }
        ],
        ui_component: "AIChatBubble"
    },
    {
        content: "I appreciate the comprehensive approach. I feel more confident knowing there's a plan in place.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 11 ===
    {
        content: "That's great to hear. Remember, it's a collaborative effort. If anything comes to mind or if you need further clarification, just let me know. I'm here to help you every step of the way. Have a good day!",
        role: "ai",
        quick_reply: [
            { name: "Thank you, you too!", func: "say_thank_you_too" },
            { name: "Goodbye", func: "say_goodbye" }
        ],
        ui_component: "AIChatBubble"
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
