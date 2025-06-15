import React from 'react';
import { SandboxPlan, UserInput } from '../../../types';
import { calculateProjection } from '../../../services/calculation';
import styles from './FinalSummary.module.scss';

interface FinalSummaryProps {
  finalPlan: SandboxPlan;
  userInput: UserInput;
  onConfirm: () => void;
  onGoBack: () => void;
}

const FinalSummary: React.FC<FinalSummaryProps> = ({ finalPlan, userInput, onConfirm, onGoBack }) => {
    const result = calculateProjection(finalPlan);
    const boostValue = finalPlan.currentPensionPot - userInput.currentPensionPot;

    let summaryText = `Here's the summary of your simulated plan to reach your <strong>'${userInput.lifestyleGoal}'</strong> lifestyle goal:\n\n` +
                      `<ul>` +
                      `<li><strong>Retirement Age:</strong> ${finalPlan.retirementAge}</li>` +
                      `<li><strong>Your Monthly Contribution:</strong> £${finalPlan.yourContribution}</li>` +
                      `<li><strong>Employer Monthly Contribution:</strong> £${finalPlan.employerContribution}</li>` +
                      (boostValue > 0 ? `<li><strong>One-time Boost:</strong> £${boostValue}</li>` : '') +
                      `</ul>\n` +
                      `This projects a final pot of <strong>£${(result.finalValue / 1000).toFixed(1)}k</strong>. `;

    if (result.gap > 0) {
        summaryText += `This is still <span class="gap-negative">£${(result.gap / 1000).toFixed(1)}k</span> short of your goal. You might need to consider increasing contributions further, delaying retirement, or perhaps exploring a plan with a higher growth potential (and higher risk).`;
    } else {
        summaryText += `This comfortably meets your goal with a surplus of <span class="gap-positive">+£${(Math.abs(result.gap) / 1000).toFixed(1)}k</span>. This looks like a solid strategy!`;
    }

    const actionText = `\n\n<strong>Next Steps:</strong>\n` +
                         `To make this plan a reality, the next step would be to log into your Fidelity account and adjust your contribution rate.\n\n` +
                         `What would you like to do now?`;

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: (summaryText + actionText).replace(/\n/g, '<br />') }} />
            <div className={styles.formActions}>
                <button onClick={onConfirm} className={styles.actionButton}>
                    I'm happy with this plan
                </button>
                <button onClick={onGoBack} className={`${styles.actionButton} ${styles.secondary}`}>
                    Go back to Sandbox
                </button>
            </div>
        </div>
    );
};

export default FinalSummary; 