import React, { useState, useEffect,useRef } from 'react';
import './Admin.scss';
// import Nav from '../../components/admin/navbar/nav';
import Chatbot from '../../components/chatbot/chatbotContainer';
import Toast from '../../components/toast/toast';
import IncomeTracker from '../../components/cards/incomeTracker/IncomeTracker';
import AssetsAllocation from '../../components/cards/assetsAllocation/assetsAllocation';
import RetirementGoal from '../../components/cards/retirementGoal/RetirementGoal';
import PensionDashboard from '../../components/cards/pension/pension.tsx';

const Admin: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msgAnimation, setMsgAnimation] = useState(false);
    const [toast, setToast] = useState({
        type: 'SUCCESS',
        message: '',
        show: false,
    });
    const [isDragging, setIsDragging] = useState('');
    const mainPanel = useRef<HTMLDivElement>(null);
    const resizer = useRef<HTMLDivElement>(null);
    const chatBot = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showMsg) {
            setTimeout(() => {
                setMsgAnimation(true);
            }, 0);
        }
    }, [showMsg]);

    useEffect(() => {
        setTimeout(() => {
            setToast({
                type: 'SUCCESS',
                message: 'Hi Harley, you have new message, would you like to check it.',
                show: true,
            });
        }, 2000);
    }, []);

    //add ability of resizing the panel
    const resizePanel = (e: React.MouseEvent) => {
        let main = mainPanel.current as HTMLElement;
        let sideBar = chatBot.current as HTMLElement;
        const initMainWidth = main.getBoundingClientRect().width;
        const initSideWidth = sideBar.getBoundingClientRect().width;
        
        // The current position of mouse in current browser
        let startX = e.clientX;

        const mouseMoveHandler = function (mouse_e: MouseEvent) {
                main.style.width = initMainWidth + (mouse_e.clientX - startX) + 'px';
                main.style.minWidth = 'unset';
                sideBar.style.width = initSideWidth + (mouse_e.clientX + startX) + 'px';
                sideBar.style.minWidth = 'unset';
            }
    

        const mouseUpHandler = function () {
            // Remove the handlers of 'mousemove' and 'mouseup'
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            //dragEle.classList.remove('resizing');
            setIsDragging('');
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        setIsDragging('dragging');
    };

    return (
        <>
            <div className="app-container">
                {!showModal ? (
                    <button
                        className="chatbot-trigger"
                        aria-label="chat bot"
                        aria-haspopup="dialog"
                        title="chatbot"
                        onClick={() => setShowModal(!showModal)}
                    ></button>
                ) : (
                    <></>
                )}
                <div className={`main-content-area`}>
                    {/* <Nav /> */}

                    <div className={`history-container ${showModal && 'expand'}`}>
                        <main ref={mainPanel}>
                            <header>
                                <a href="https://github.com/Harley-Li/Me" className="site-logo"></a> <span>FIDELITY</span>
                                <div className="tab-list">
                                    <input type="radio" name="top-tabs" id="" aria-label="Home" defaultChecked={true} />
                                    <input type="radio" name="top-tabs" id="" aria-label="Market" />
                                    <input type="radio" name="top-tabs" id="" aria-label="AI-Board" />
                                </div>
                                <div className="search-box">
                                    <input type="search" name="" id="" placeholder="Enter your search request..." />
                                </div>
                                <div
                                    className="msg"
                                    onClick={() => {
                                        setShowMsg(true);
                                    }}
                                >
                                    <img src="/chatbot/icons/msg.svg" alt="msg" />
                                </div>
                                <div className={`msg-box ${showMsg && 'show'} ${msgAnimation && 'play'}`}>
                                    <ul>
                                        <li>
                                            <div className="msg-content">
                                                <p>Hey Sarah!</p>
                                                <p>
                                                    I noticed that there's been an increase in yourincome. Congratulations on that achievement! It might be a
                                                    good time to review your retirement plan and see if any adjustments could better align with your new
                                                    financial situation. Would you like to review it?"
                                                </p>
                                            </div>
                                            <div className="button-group">
                                                <button
                                                    className="button primary"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setShowMsg(false);
                                                        setMsgAnimation(false);
                                                    }}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    className="button secondary"
                                                    onClick={() => {
                                                        setShowMsg(false);
                                                        setMsgAnimation(false);
                                                    }}
                                                >
                                                    No
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="whoswho">
                                    <img src="/chatbot/icons/person.png" alt="Harley" />
                                </div>
                            </header>
                            <div className="content-area">
                                <IncomeTracker></IncomeTracker>
                                <AssetsAllocation></AssetsAllocation>
                                <PensionDashboard></PensionDashboard>
                                <RetirementGoal></RetirementGoal>
                            </div>
                        </main>
                        <div className='resizer' ref={resizer}
                            onMouseDown={(e: React.MouseEvent) => {
                                resizePanel(e);
                            }}>
                            <div className='bar'></div>
                        </div>
                        <aside aria-labelledby="sidebar_title" ref={chatBot} >
                            <Chatbot></Chatbot>
                        </aside>
                    </div>
                </div>
            </div>
            <Toast toast={toast} setToast={setToast}></Toast>
        </>
    );
};

export default Admin;
