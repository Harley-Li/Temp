import React, { useState, useEffect, useRef } from 'react';
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

    const mainPanel = useRef<HTMLDivElement>(null);
    const mainContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showMsg) {
            setTimeout(() => {
                setMsgAnimation(true);
            }, 0);
        }
    }, [showMsg]);

    //add ability of resizing the panel
    const resizePanel = (e: React.MouseEvent) => {
        let mainLayout = mainContainer.current as HTMLElement;
        const initMainWidth = (mainPanel.current as HTMLElement).getBoundingClientRect().width;

        let startX = e.clientX;
        const mouseMoveHandler = function (mouse_e: MouseEvent) {
            document.body.classList.add('resizing');
            const maxWidth = mainLayout.getBoundingClientRect().width - 41.5 * 16;
            const minWidth = 812;

            if (initMainWidth + (mouse_e.clientX - startX) < maxWidth && initMainWidth + (mouse_e.clientX - startX) > minWidth) {
                mainLayout.style.gridTemplateColumns = `${initMainWidth + (mouse_e.clientX - startX)}px 1.5rem 1fr`;
            }
        }

        const mouseUpHandler = function () {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            document.body.classList.remove('resizing');
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    return (
        <>
            <div className="app-container">
                <div className={`main-content-area`}>

                    <div className={`conversation-container ${showModal && 'expand'}`} ref={mainContainer}>
                        <main ref={mainPanel}>
                            <header>
                                <a href="https://github.com/Harley-Li/Me" className="site-logo"></a> <span>Fidelity UK</span>
                                <div className="tab-list">
                                    <input type="radio" name="top-tabs" id="" aria-label="Home" defaultChecked={true} />
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
                        <div className='resizer'
                            onMouseDown={(e: React.MouseEvent) => {
                                resizePanel(e);
                            }}>
                            <div className='bar'></div>
                        </div>
                        <aside aria-labelledby="sidebar_title" >
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
