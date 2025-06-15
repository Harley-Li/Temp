import { Plan, ProjectionResult } from '../types';

/**
 * Calculates the target retirement pot based on a lifestyle choice.
 * Based on PLSA Retirement Living Standards 2023/24 for a single person.
 * @param lifestyle - The desired retirement lifestyle.
 * @returns The target pension pot amount.
 */
export function getLifestyleTarget(lifestyle: 'Minimum' | 'Moderate' | 'Comfortable'): number {
    const targets = {
        'Minimum': 14400 / 0.04, // £360,000
        'Moderate': 24900 / 0.04, // £622,500
        'Comfortable': 43100 / 0.04, // £1,077,500
    };
    return targets[lifestyle] || targets['Moderate'];
}

/**
 * Calculates the projected final value of a pension pot and the gap to the target.
 * @param plan - The retirement plan details.
 * @returns An object with the final projected value and the gap.
 */
export function calculateProjection(plan: Plan): ProjectionResult {
    const { 
        currentAge, 
        retirementAge, 
        currentPensionPot, 
        yourContribution, 
        employerContribution, 
        annualReturn, 
        targetAmount 
    } = plan;

    const years = retirementAge - currentAge;
    const totalMonthlyContribution = yourContribution + employerContribution;

    if (years < 0) {
        return { finalValue: currentPensionPot, gap: targetAmount - currentPensionPot };
    }

    let finalValue = currentPensionPot * Math.pow(1 + annualReturn, years);
    
    if (annualReturn > 0) {
        finalValue += (totalMonthlyContribution * 12) * ((Math.pow(1 + annualReturn, years) - 1) / annualReturn);
    } else {
        finalValue += (totalMonthlyContribution * 12) * years;
    }

    return { 
        finalValue: Math.round(finalValue), 
        gap: Math.round(targetAmount - finalValue) 
    };
}

/**
 * Generates an array of projected values for each year up to a max number of years.
 * @param plan - The retirement plan to project.
 * @param maxYears - The maximum number of years to project for.
 * @returns An array of numbers representing the projected value for each year.
 */
export function generateProjectionData(plan: Plan, maxYears: number): number[] {
    let data: number[] = [];
    for (let i = 0; i <= maxYears; i++) {
        const tempPlan = { ...plan, retirementAge: plan.currentAge + i };
        data.push(calculateProjection(tempPlan).finalValue);
    }
    return data;
} 