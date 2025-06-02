import React from 'react'
import './index.scss'

const HalfCircleProgress:React.FC = ()=> {
  return (
    <div className="half-progress-container" data-progress="60">
      <div className="bg-circle">
        <div className="bg-bar"></div>
      </div>
      <div className="side-ball"></div>
    </div>
  )
}

export default HalfCircleProgress;
