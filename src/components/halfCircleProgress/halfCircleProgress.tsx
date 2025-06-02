import React from 'react'
import './index.scss'

const HalfCircleProgress: React.FC = () => {
    return (
        <div className="half-progress-container" data-progress="65">
            <div className='half-circle-area'>
                <div className="bg-circle">
                    <div className="bg-bar"></div>
                </div>
                <div className='degree-list'>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                    <div className='degree'></div>
                </div>
            </div>
            <div className='pin'></div>
            <div className="track-ball"></div>
            <div className="side-ball"></div>
        </div>
    )
}

export default HalfCircleProgress;
