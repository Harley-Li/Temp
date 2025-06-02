import React from 'react';
import HalfCircleProgress from '../../halfCircleProgress/halfCircleProgress.tsx';
import './ index.scss';

const RetirementGoal: React.FC = () => {
    return (
        <div className="retirement-goal">
            <div className="goal-progress">
                <h2>Retirement Goal</h2>
                <HalfCircleProgress />
            </div>
            <div className="goal">
                <p>
                    Your ability to fund retirement at age 60 will be <strong>65%</strong>. Here are your financial status with strategies applied.
                </p>
            </div>
            <ul>
                <li>
                    <span>Monthly need:</span>
                    <span>$6.29K</span>
                </li>
                <li>
                    <span>Monthly ability:</span>
                    <span>$8.5k</span>
                </li>
                <li>
                    <span>Retirement cusion:</span>
                    <span>2</span>
                </li>
            </ul>
        </div>
    );
};

export default RetirementGoal;
