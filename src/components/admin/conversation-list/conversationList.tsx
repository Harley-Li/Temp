import React from 'react';
import './conversation-list.scss';
import SearchBox from './search-box/searchBox';
import ConversationItem from './conversation-item/conversationItem';

const ConversationList: React.FC = () => {
    return (
        <div className="conversation-history-container">
            <SearchBox></SearchBox>
            <div>All Conversations</div>
            <div className="conversation-list">
                {[1, 2, 3, 4, 5, 6, 7].map((_, index) => {
                    return <ConversationItem key={index}></ConversationItem>;
                })}
            </div>
        </div>
    );
};

export default ConversationList;
