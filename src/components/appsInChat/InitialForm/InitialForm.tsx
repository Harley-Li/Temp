import React, { useState } from 'react';
import { UserInput } from '../../../types/index';
import styles from './InitialForm.module.scss';

type Lifestyle = 'Minimum' | 'Moderate' | 'Comfortable';

interface InitialFormProps {
  onSubmit: (data: Omit<UserInput, 'targetAmount'>) => void;
  initialData: Omit<UserInput, 'targetAmount'>;
}

const LifestyleOption: React.FC<{
    value: Lifestyle,
    title: string,
    description: string,
    selectedValue: Lifestyle,
    onChange: (value: Lifestyle) => void
}> = ({ value, title, description, selectedValue, onChange }) => (
    <label className={`${styles.lifestyleOption} ${selectedValue === value ? styles.selected : ''}`}>
        <input 
            type="radio" 
            name="lifestyle" 
            value={value}
            checked={selectedValue === value}
            onChange={() => onChange(value)}
        />
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
    </label>
);


const InitialForm: React.FC<InitialFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: Number(value) }));
    };

    const handleLifestyleChange = (value: Lifestyle) => {
        setFormData(prev => ({...prev, lifestyleGoal: value}));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

  return (
    <div className={styles.infoFormCard}>
        <h4>Review Your Retirement Plan</h4>
        <form onSubmit={handleSubmit} className={styles.infoCollectionForm}>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="currentPensionPot">Current Pension Pot (£)</label>
                    <input type="number" id="currentPensionPot" value={formData.currentPensionPot} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="currentAge">Current Age</label>
                    <input type="number" id="currentAge" value={formData.currentAge} onChange={handleChange} required />
                </div>
            </div>
            
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="yourContribution">Your Monthly Contribution (£)</label>
                    <input type="number" id="yourContribution" value={formData.yourContribution} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="employerContribution">Employer Monthly Contribution (£)</label>
                    <input type="number" id="employerContribution" value={formData.employerContribution} onChange={handleChange} required />
                </div>
            </div>
            
            <div className={styles.lifestyleGoalGroup}>
               <label>What's your desired retirement lifestyle?</label>
               <div className={styles.lifestyleOptions}>
                    <LifestyleOption value="Minimum" title="Minimum" description="Covers all your basic needs with a little left over. (~£14.4k/yr)" selectedValue={formData.lifestyleGoal} onChange={handleLifestyleChange} />
                    <LifestyleOption value="Moderate" title="Moderate" description="More financial security and flexibility. (~£24.9k/yr)" selectedValue={formData.lifestyleGoal} onChange={handleLifestyleChange} />
                    <LifestyleOption value="Comfortable" title="Comfortable" description="More financial freedom and some luxuries. (~£43.1k/yr)" selectedValue={formData.lifestyleGoal} onChange={handleLifestyleChange} />
               </div>
            </div>
            
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="retirementAge">Target Retirement Age</label>
                    <input type="number" id="retirementAge" value={formData.retirementAge} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    {/* Empty div to maintain layout */}
                </div>
            </div>
            
            <div className={styles.formActions}>
                <button type="submit" className={styles.actionButton}>Check My Projection</button>
            </div>
        </form>
    </div>
  );
};

export default InitialForm; 