// import ChatbotInput from './input/chatbotInput'; // Removed import
import ConversationSection from './ConversationSection';
// import axios from 'axios'; // Commented out as it's not used in simulated chat
import './chatbotContainer.scss';
import React, { useState, useRef, useEffect } from 'react';
import InitialForm from '../appsInChat/InitialForm/InitialForm';
import ProjectionView from '../appsInChat/ProjectionView/ProjectionView';
import FinalSummary from '../appsInChat/FinalSummary/FinalSummary';
import Sandbox from '../appsInChat/Sandbox/Sandbox';
import { getLifestyleTarget } from '../../services/calculation';

interface chatItem {
    content: string;
    role: string;
    component?: React.ReactNode;
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
    component_props?: any;
}

const sampleChatMessages: i_msg[] = [
    // === Turn 1 ===
    {
        content: "Hello! As a Fidelity Workplace Pension member, it's a great idea to check if you're on track for the retirement you want.\nLet's start by reviewing your current plan and goals.",
        role: "ai",
        quick_reply: [],
        ui_component: "InitialForm",
        component_props: {
            initialData: {
                currentPensionPot: 50000,
                yourContribution: 200,
                employerContribution: 100,
                currentAge: 35,
                retirementAge: 67,
                lifestyleGoal: 'Moderate'
            }
        }
    },
    {
        content: "Okay, I've updated my details.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 2 ===
    {
        content: "Analysis complete! Based on your data, I've created three alternative investment paths with different risk levels and compared them with your current trajectory.",
        role: "ai",
        quick_reply: [
            { name: "Explore in Retirement Sandbox", func: "goto_sandbox" }
        ],
        ui_component: "ProjectionView",
        component_props: {
            plans: {
                current: { 
                    name: 'Current Path', 
                    risk: 'Medium', 
                    stockAllocation: 0.50, 
                    annualReturn: 0.05, 
                    color: '#38a169',
                    currentPensionPot: 50000,
                    yourContribution: 200,
                    employerContribution: 100,
                    currentAge: 35,
                    retirementAge: 67,
                    targetAmount: 622500
                },
                conservative: { 
                    name: 'Cautious', 
                    risk: 'Low', 
                    stockAllocation: 0.30, 
                    annualReturn: 0.035, 
                    color: '#3182ce',
                    currentPensionPot: 50000,
                    yourContribution: 200,
                    employerContribution: 100,
                    currentAge: 35,
                    retirementAge: 67,
                    targetAmount: 622500
                },
                balanced: { 
                    name: 'Balanced', 
                    risk: 'High', 
                    stockAllocation: 0.65, 
                    annualReturn: 0.06, 
                    color: '#dd6b20',
                    currentPensionPot: 50000,
                    yourContribution: 200,
                    employerContribution: 100,
                    currentAge: 35,
                    retirementAge: 67,
                    targetAmount: 622500
                },
                aggressive: { 
                    name: 'Adventurous', 
                    risk: 'Very-High', 
                    stockAllocation: 0.85, 
                    annualReturn: 0.075, 
                    color: '#e53e3e',
                    currentPensionPot: 50000,
                    yourContribution: 200,
                    employerContribution: 100,
                    currentAge: 35,
                    retirementAge: 67,
                    targetAmount: 622500
                }
            },
            userInput: {
                currentPensionPot: 50000,
                yourContribution: 200,
                employerContribution: 100,
                currentAge: 35,
                retirementAge: 67,
                lifestyleGoal: 'Moderate',
                targetAmount: 622500
            }
        }
    },
    {
        content: "Take me to the Retirement Sandbox.",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 3 ===
    {
        content: "Welcome to the Retirement Sandbox! Here, you can experiment by adjusting different variables to see their real-time impact on your retirement future.",
        role: "ai",
        quick_reply: [
        ],
        ui_component: "Sandbox",
        component_props: {
            initialSandboxPlan: {
                name: 'Sandbox',
                risk: 'High',
                stockAllocation: 0.65,
                annualReturn: 0.06,
                color: '#667eea',
                currentPensionPot: 50000,
                yourContribution: 200,
                employerContribution: 100,
                currentAge: 35,
                retirementAge: 67,
                targetAmount: 622500
            },
            initialUserInput: {
                currentPensionPot: 50000,
                yourContribution: 200,
                employerContribution: 100,
                currentAge: 35,
                retirementAge: 67,
                lifestyleGoal: 'Moderate',
                targetAmount: 622500
            }
        }
    },
    {
        content: "Okay, I've adjusted the sliders. How does this look for my goal?",
        role: "user",
        quick_reply: [],
        ui_component: "UserChatBubble"
    },
    // === Turn 4 ===
    {
        content: "Here's a summary of your customized retirement plan. Based on your adjustments, I've calculated the projected outcomes and how they align with your retirement goals.",
        role: "ai",
        quick_reply: [
            { name: "Go Back to Sandbox", func: "back_to_sandbox" },
            { name: "Confirm Plan", func: "confirm_plan" }
        ],
        ui_component: "FinalSummary",
        component_props: {
            finalPlan: {
                name: 'Sandbox',
                risk: 'High',
                stockAllocation: 0.65,
                annualReturn: 0.06,
                color: '#667eea',
                currentPensionPot: 50000,
                yourContribution: 200,
                employerContribution: 100,
                currentAge: 35,
                retirementAge: 67,
                targetAmount: 622500
            },
            userInput: {
                currentPensionPot: 50000,
                yourContribution: 200,
                employerContribution: 100,
                currentAge: 35,
                retirementAge: 67,
                lifestyleGoal: 'Moderate',
                targetAmount: 622500
            }
        }
    },
];

const ChatbotContainer: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<chatItem[]>([]);
    const [currentQuickReplies, setCurrentQuickReplies] = useState<i_quick_reply[]>([]);
    const currentDialogueStepRef = useRef<number>(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const THINKING_MESSAGE_CONTENT = "AI is thinking..."; // English thinking message
    const [userFormData, setUserFormData] = useState<any>(null);
    const [finalPlanData, setFinalPlanData] = useState<any>(null);

    // Define min and max delay for AI thinking simulation
    const MIN_THINKING_DELAY = 1500; // 1.5 seconds
    const MAX_THINKING_DELAY = 4000; // 4 seconds

    // Function to render the appropriate component based on ui_component
    const renderComponent = (item: i_msg) => {
        if (!item.ui_component || item.ui_component === 'AIChatBubble' || item.ui_component === 'UserChatBubble') {
            return null;
        }
        
        switch (item.ui_component) {
            case 'InitialForm':
                return <InitialForm 
                    initialData={item.component_props?.initialData} 
                    onSubmit={handleFormSubmit} 
                />;
            case 'ProjectionView':
                // If we have user form data, use it to generate plans
                const plans = userFormData ? generatePlansFromUserData(userFormData) : item.component_props?.plans;
                const userInput = userFormData ? {
                    ...userFormData,
                    targetAmount: getLifestyleTarget(userFormData.lifestyleGoal)
                } : item.component_props?.userInput;
                
                return <ProjectionView 
                    plans={plans}
                    userInput={userInput}
                    onGoToSandbox={() => handleGoToSandbox()}
                />;
            case 'Sandbox':
                const initialSandboxPlan = userFormData ? {
                    name: 'Sandbox',
                    risk: 'High',
                    stockAllocation: 0.65,
                    annualReturn: 0.06,
                    color: '#667eea',
                    ...userFormData,
                    targetAmount: getLifestyleTarget(userFormData.lifestyleGoal)
                } : item.component_props?.initialSandboxPlan;
                
                const initialUserInput = userFormData ? {
                    ...userFormData,
                    targetAmount: getLifestyleTarget(userFormData.lifestyleGoal)
                } : item.component_props?.initialUserInput;
                
                return <Sandbox 
                    initialSandboxPlan={initialSandboxPlan}
                    initialUserInput={initialUserInput}
                    onFinalize={(finalPlan) => handleFinalizeSandbox(finalPlan)}
                />;
            case 'FinalSummary':
                return <FinalSummary 
                    finalPlan={finalPlanData || item.component_props?.finalPlan}
                    userInput={userFormData || item.component_props?.userInput}
                    onConfirm={() => console.log('Plan confirmed')}
                    onGoBack={() => console.log('Back to sandbox')}
                />;
            default:
                return null;
        }
    };

    // Generate plans based on user form data
    const generatePlansFromUserData = (userData: any) => {
        const targetAmount = getLifestyleTarget(userData.lifestyleGoal);
        return {
            current: { 
                name: 'Current Path', 
                risk: 'Medium', 
                stockAllocation: 0.50, 
                annualReturn: 0.05, 
                color: '#38a169',
                ...userData,
                targetAmount
            },
            conservative: { 
                name: 'Cautious', 
                risk: 'Low', 
                stockAllocation: 0.30, 
                annualReturn: 0.035, 
                color: '#3182ce',
                ...userData,
                targetAmount
            },
            balanced: { 
                name: 'Balanced', 
                risk: 'High', 
                stockAllocation: 0.65, 
                annualReturn: 0.06, 
                color: '#dd6b20',
                ...userData,
                targetAmount
            },
            aggressive: { 
                name: 'Adventurous', 
                risk: 'Very-High', 
                stockAllocation: 0.85, 
                annualReturn: 0.075, 
                color: '#e53e3e',
                ...userData,
                targetAmount
            }
        };
    };

    // Handle form submission from InitialForm
    const handleFormSubmit = (data: any) => {
        console.log('Form submitted:', data);
        // Store the user form data
        setUserFormData({
            ...data,
            targetAmount: getLifestyleTarget(data.lifestyleGoal)
        });
        
        // Move to the next AI message (ProjectionView)
        handleUserSubmit("Okay, I've updated my details.", false);
    };

    // Handle click on "Go to Sandbox" button
    const handleGoToSandbox = () => {
        handleUserSubmit("Take me to the Retirement Sandbox.", false);
    };

    useEffect(() => {
        if (sampleChatMessages.length > 0) {
            const firstMessage = sampleChatMessages[0];
            if (firstMessage.role === 'ai') {
                setChatHistory([{ 
                    content: firstMessage.content, 
                    role: firstMessage.role,
                    component: renderComponent(firstMessage)
                }]);
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
                setChatHistory(prev => [...prev, { 
                    content: aiMessageObject.content, 
                    role: aiMessageObject.role,
                    component: renderComponent(aiMessageObject)
                }]);
                
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
        setChatHistory(prev => [...prev, { 
            content: userInput, 
            role: 'user'
        }]);
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

    const handleFinalizeSandbox = (finalPlan: any) => {
        // Store the final plan
        setFinalPlanData(finalPlan);
        
        // Move to the FinalSummary component
        handleUserSubmit("Review this Simulation", false);
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
