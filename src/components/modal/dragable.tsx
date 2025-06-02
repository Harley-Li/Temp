import React, { useState, useEffect, useRef } from 'react';
import './modal.scss';
import Chatbot from '../../components/chatbot/chatbotContainer';

interface i_props {
    show: boolean;
    hideModal: () => void;
}

const DragableModal: React.FC<i_props> = (props) => {
    const [show, setShow] = useState(props.show);
    const [playAnimation, setPlayAnimation] = useState('');
    const [played, setPlayed] = useState('');
    const [isDragging, setIsDragging] = useState('');
    const flyContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setShow(props.show);
        if (props.show) {
            setTimeout(() => {
                setPlayAnimation('play');
            }, 100);
            setTimeout(() => {
                setPlayed('done');
            }, 500);
        }
    }, [props.show]);

    const handleModalDisplay = () => {
        setShow(!show);
        props.hideModal();
        // remove min-height for animation
        setPlayed('');
        setPlayAnimation('');
    };

    //add ability of movement onto popup
    const mouseDownHandler = (e: React.MouseEvent) => {
        let dragEle = flyContainer.current as HTMLElement;
        let eleTop;
        let eleLeft;

        // The current position of mouse in current browser
        let startX = e.clientX;
        let startY = e.clientY;
        const newStyles = window.getComputedStyle(dragEle);
        eleTop = parseInt(newStyles.top, 10);
        eleLeft = parseInt(newStyles.left, 10);

        const mouseMoveHandler = function (mouse_e: MouseEvent) {
            if (eleTop + mouse_e.clientY - startY > 0) {
                dragEle.style.top = eleTop + mouse_e.clientY - startY + 'px';
            }

            if (eleLeft + mouse_e.clientX - startX > 0) {
                dragEle.style.left = eleLeft + mouse_e.clientX - startX + 'px';
            }
        };

        const mouseUpHandler = function () {
            // Remove the handlers of 'mousemove' and 'mouseup'
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            dragEle.style.zIndex = '99999999';
            setIsDragging('');
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        setIsDragging('dragging');
    };

    //add ability of resizing the panel
    const resizePanel = (e: React.MouseEvent) => {
        let dragEle = flyContainer.current as HTMLElement;
        const whichPart = (e.target as HTMLElement).classList[1];
        const initWidth = dragEle.getBoundingClientRect().width;
        const initHeight = dragEle.getBoundingClientRect().height;
        dragEle.classList.add('resizing');
        setPosition();

        // The current position of mouse in current browser
        let startX = e.clientX;
        let startY = e.clientY;

        const mouseMoveHandler = function (mouse_e: MouseEvent) {
            if (whichPart === 'right') {
                dragEle.style.width = initWidth + (mouse_e.clientX - startX) + 'px';
            } else if (whichPart === 'bottom') {
                dragEle.style.height = initHeight + (mouse_e.clientY - startY) + 'px';
            } else {
                dragEle.style.width = initWidth + (mouse_e.clientX - startX) + 'px';
                dragEle.style.height = initHeight + (mouse_e.clientY - startY) + 'px';
            }
        };

        const mouseUpHandler = function () {
            // Remove the handlers of 'mousemove' and 'mouseup'
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            dragEle.classList.remove('resizing');
            setIsDragging('');
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        setIsDragging('dragging');
    };

    // convert the position to top and left
    const setPosition = () => {
        // prevent the size change based on bottom and right position
        let dragEle = flyContainer.current as HTMLElement;
        const newStyles = window.getComputedStyle(dragEle);
        dragEle.style.top = newStyles.top;
        dragEle.style.bottom = 'unset';
        dragEle.style.left = newStyles.left;
        dragEle.style.right = 'unset';
    };

    return (
        <>
            {show ? (
                <div className={`fly-container ${playAnimation} ${played} ${isDragging}`} ref={flyContainer}>
                    <div
                        className="panel-title"
                        onMouseDown={(e: React.MouseEvent) => {
                            mouseDownHandler(e);
                        }}
                    >
                        <span>ChatBot</span>
                        <div className="button-group">
                            <button className="close-btn" aria-label="close modal" onClick={() => handleModalDisplay()}></button>
                        </div>
                    </div>
                    <div className="modal-content">
                        <Chatbot></Chatbot>
                    </div>
                    <div
                        className="resize-bar right"
                        onMouseDown={(e: React.MouseEvent) => {
                            resizePanel(e);
                        }}
                    ></div>
                    <div
                        className="resize-bar bottom"
                        onMouseDown={(e: React.MouseEvent) => {
                            resizePanel(e);
                        }}
                    ></div>
                    <div
                        className="resize-bar corner"
                        onMouseDown={(e: React.MouseEvent) => {
                            resizePanel(e);
                        }}
                    ></div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default DragableModal;
