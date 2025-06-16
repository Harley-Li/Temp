import React from 'react';

interface chatItem {
    content: string;
    role: string;
    component?: React.ReactNode;
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
                        <React.Fragment key={index}>
                            <div className={item.role}>
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
                                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                    </div>
                                )}
                            </div>
                            {item.component && (
                                <div className="component-wrapper">
                                    {item.component}
                                </div>
                            )}</React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default ConversationSection;
