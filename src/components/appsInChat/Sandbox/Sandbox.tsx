import React, { useState, useEffect, useRef } from 'react';
import { SandboxPlan, UserInput, ProjectionResult } from '../../../types/index';
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
    
    // Refs for sliders to update their background
    const ageSliderRef = useRef<HTMLInputElement>(null);
    const contribSliderRef = useRef<HTMLInputElement>(null);
    const boostSliderRef = useRef<HTMLInputElement>(null);

    const updateSliderBackground = (slider: HTMLInputElement) => {
        const min = parseInt(slider.min);
        const max = parseInt(slider.max);
        const value = parseInt(slider.value);
        const percentage = ((value - min) / (max - min)) * 100;
        slider.style.backgroundSize = `${percentage}% 100%`;
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, valueAsNumber } = e.target;
        
        // Update slider background
        updateSliderBackground(e.target);
        
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

    // Initialize slider backgrounds on mount and when values change
    useEffect(() => {
        if (ageSliderRef.current) updateSliderBackground(ageSliderRef.current);
        if (contribSliderRef.current) updateSliderBackground(contribSliderRef.current);
        if (boostSliderRef.current) updateSliderBackground(boostSliderRef.current);
    }, [sandboxPlan.retirementAge, sandboxPlan.yourContribution, sandboxPlan.employerContribution, boost]);

    useEffect(() => {
        const planWithBoost = { ...sandboxPlan, currentPensionPot: initialUserInput.currentPensionPot + boost };
        const result = calculateProjection(planWithBoost);
        setProjection(result);
    }, [sandboxPlan, boost, initialUserInput.currentPensionPot]);


    const totalContribution = sandboxPlan.yourContribution + sandboxPlan.employerContribution;
    const yourSharePercentage = Math.round((sandboxPlan.yourContribution / totalContribution) * 100);
    const employerSharePercentage = 100 - yourSharePercentage;
    
    const gapText = projection ? (
        projection.gap > 0 ?
        `there's a projected shortfall of <span class="${styles.negative}">£${(projection.gap / 1000).toFixed(1)}k</span> for your '${initialUserInput.lifestyleGoal}' goal.` :
        `you're projected to exceed your '${initialUserInput.lifestyleGoal}' goal with a surplus of <span class="${styles.positive}">+£${(Math.abs(projection.gap) / 1000).toFixed(1)}k</span>!`
    ) : '';
    const feedbackText = projection ? `With these settings, you're projected to accumulate <strong>£${(projection.finalValue/1000).toFixed(1)}k</strong> by age ${sandboxPlan.retirementAge}. Currently, ${gapText}` : '';

    // Calculate min and max retirement age based on current age
    const minRetirementAge = Math.min(initialUserInput.currentAge + 5, 55); // At least 5 years from now, minimum 55
    const maxRetirementAge = Math.max(initialUserInput.currentAge + 35, 75); // At most 35 years from now, maximum 75
    
    // Calculate tick values for retirement age slider
    const midRetirementAge = Math.round((minRetirementAge + maxRetirementAge) / 2);

    return (
        <div className={styles.scenarioSandbox}>
            <h4>Retirement Sandbox Simulator</h4>
            <div className={styles.sandboxControls}>
                <div className={styles.sandboxControl}>
                    <label>
                        <span className={styles.sliderLabel}>Retirement Age</span>
                        <span className={styles.controlValue}>{sandboxPlan.retirementAge}</span>
                    </label>
                    <input 
                        type="range" 
                        id="age-slider" 
                        min={minRetirementAge}
                        max={maxRetirementAge}
                        value={sandboxPlan.retirementAge} 
                        onChange={handleSliderChange} 
                        ref={ageSliderRef}
                    />
                    <div className={styles.sliderTicks}>
                        <span>{minRetirementAge}</span>
                        <span>{midRetirementAge}</span>
                        <span>{maxRetirementAge}</span>
                    </div>
                </div>
                
                <div className={styles.sandboxControl}>
                    <label>
                        <span className={styles.sliderLabel}>Total Monthly Contribution</span>
                        <span className={styles.controlValue}>£{totalContribution}</span>
                    </label>
                    <input 
                        type="range" 
                        id="contrib-slider" 
                        min="100" 
                        max="2000" 
                        step="50" 
                        value={totalContribution} 
                        onChange={handleSliderChange} 
                        ref={contribSliderRef}
                    />
                    <div className={styles.sliderDetails}>
                        <span>Your contribution: £{sandboxPlan.yourContribution} ({yourSharePercentage}%)</span>
                        <span>Employer: £{sandboxPlan.employerContribution} ({employerSharePercentage}%)</span>
                    </div>
                </div>
                
                <div className={styles.sandboxControl}>
                    <label>
                        <span className={styles.sliderLabel}>One-time Investment Boost</span>
                        <span className={styles.controlValue}>£{boost.toLocaleString()}</span>
                    </label>
                    <input 
                        type="range" 
                        id="boost-slider" 
                        min="0" 
                        max="100000" 
                        step="1000" 
                        value={boost} 
                        onChange={handleSliderChange} 
                        ref={boostSliderRef}
                    />
                    <div className={styles.sliderTicks}>
                        <span>£0</span>
                        <span>£50k</span>
                        <span>£100k</span>
                    </div>
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