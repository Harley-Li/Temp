import React from 'react';

interface chatItem {
    content: string;
    role: string;
}
interface i_Props {
    history: chatItem[];
}
const ConversationSection: React.FC<i_Props> = (prop) => {
    return (
        <div className="conversation-section">
            <div>
                {prop.history.map((item, index) => {
                    return (
                        <div className={item.role} key={index}>
                            {item.role.includes('thinking') ? (
                                <div className="thinking-container">
                                    <span className="thinking-text">Thinking</span>
                                    <div className="dots">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>{item.content}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ConversationSection;
