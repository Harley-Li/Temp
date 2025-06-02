import React from 'react';

const ConversationItem: React.FC = () => {
    const subjects = ['ISA', 'SIPP', 'Fund', 'Transfer', 'Investment'];

    const randomSubject = () => {
        const index = Math.floor(Math.random() * (4 - 0 + 0)) + 0;
        if (index === 4) {
            return [subjects[index], subjects[index - 2], subjects[index - 3]];
        } else if (index === 0) {
            return [subjects[index], subjects[index + 3], subjects[index + 4]];
        } else if (index === 2) {
            return [subjects[index], subjects[0]];
        } else if (index === 1) {
            return [subjects[index]];
        } else if (index === 3) {
            return [subjects[index], subjects[1]];
        }
    };

    const score = Math.floor(Math.random() * (4 - 0 + 0));
    const second = Math.floor(Math.random() * (59 - 0 + 0));

    return (
        <div className="conversation">
            {/* <img src="/person.png" alt="" /> */}
            <div className="direction">
                {/* <div className="name">{randomPeople()}</div> */}
                <ul>
                    {randomSubject()!.map((item, index) => {
                        return <li key={index}>{item}</li>;
                    })}
                </ul>
            </div>
            <div className="result">
                <div className="date">
                    Duration:
                    <span>
                        {Math.floor(Math.random() * (10 - 1 + 1))}:{(second < 10 ? '0' : '') + second}
                    </span>
                </div>

                <div className="star-container">
                    {new Array(5).fill(0).map((_, index) => {
                        return (
                            <span key={index} className={'star ' + (index < score + 1 ? 'filled' : '')}>
                                ★
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ConversationItem;
