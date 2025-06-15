import React, { useState, useEffect } from 'react';
import { SandboxPlan, UserInput, ProjectionResult } from '../../../types';
import { calculateProjection } from '../../../services/calculation';
import styles from './Sandbox.module.scss';

interface SandboxProps {
  initialSandboxPlan: SandboxPlan;
  initialUserInput: UserInput;
  onFinalize: (finalPlan: SandboxPlan) => void;
}

const Sandbox: React.FC<SandboxProps> = ({ initialSandboxPlan, initialUserInput, onFinalize }) => {
    const [sandboxPlan, setSandboxPlan] = useState<SandboxPlan>(initialSandboxPlan);
    const [boost, setBoost] = useState(0);
    const [projection, setProjection] = useState<ProjectionResult | null>(null);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, valueAsNumber } = e.target;
        
        if(id === 'boost-slider') {
            setBoost(valueAsNumber);
            return;
        }

        const originalTotalContribution = initialUserInput.yourContribution + initialUserInput.employerContribution;
        const yourShare = originalTotalContribution > 0 ? initialUserInput.yourContribution / originalTotalContribution : 0.5;

        setSandboxPlan(prev => {
            const newPlan = { ...prev };
            if(id === 'age-slider') newPlan.retirementAge = valueAsNumber;
            if(id === 'contrib-slider') {
                newPlan.yourContribution = Math.round(valueAsNumber * yourShare);
                newPlan.employerContribution = valueAsNumber - newPlan.yourContribution;
            }
            return newPlan;
        });
    };

    useEffect(() => {
        const planWithBoost = { ...sandboxPlan, currentPensionPot: initialUserInput.currentPensionPot + boost };
        const result = calculateProjection(planWithBoost);
        setProjection(result);
    }, [sandboxPlan, boost, initialUserInput.currentPensionPot]);


    const totalContribution = sandboxPlan.yourContribution + sandboxPlan.employerContribution;
    const gapText = projection ? (
        projection.gap > 0 ?
        `there's a projected shortfall of <span class="gap-negative">£${(projection.gap / 1000).toFixed(1)}k</span> for your '${initialUserInput.lifestyleGoal}' goal.` :
        `you're projected to exceed your '${initialUserInput.lifestyleGoal}' goal with a surplus of <span class="gap-positive">+£${(Math.abs(projection.gap) / 1000).toFixed(1)}k</span>!`
    ) : '';
    const feedbackText = projection ? `With these settings, you're projected to accumulate <strong>£${(projection.finalValue/1000).toFixed(1)}k</strong> by age ${sandboxPlan.retirementAge}. Currently, ${gapText}` : '';


    return (
        <div className={styles.scenarioSandbox}>
            <h4 className={styles.sandboxTitle}>Retirement Sandbox Simulator</h4>
            <div className={styles.sandboxControls}>
                <div className={styles.sandboxControl}>
                    <label><span>Retirement Age</span><span className={styles.controlValue}>{sandboxPlan.retirementAge}</span></label>
                    <input type="range" id="age-slider" min="60" max="70" value={sandboxPlan.retirementAge} onChange={handleSliderChange} />
                </div>
                <div className={styles.sandboxControl}>
                    <label><span>Total Monthly Contribution</span><span className={styles.controlValue}>£{totalContribution}</span></label>
                    <input type="range" id="contrib-slider" min="100" max="2000" step="50" value={totalContribution} onChange={handleSliderChange} />
                </div>
                <div className={styles.sandboxControl}>
                    <label><span>One-time Investment Boost</span><span className={styles.controlValue}>£{boost}</span></label>
                    <input type="range" id="boost-slider" min="0" max="100000" step="1000" value={boost} onChange={handleSliderChange} />
                </div>
            </div>
            <div className={styles.sandboxFeedback} dangerouslySetInnerHTML={{ __html: feedbackText }} />
            <div className={styles.formActions}>
                <button onClick={() => onFinalize({...sandboxPlan, currentPensionPot: initialUserInput.currentPensionPot + boost})} className={styles.actionButton}>
                    Review this Simulation
                </button>
            </div>
        </div>
    );
};

export default Sandbox; 