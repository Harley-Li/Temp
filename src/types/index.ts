export interface UserInput {
  currentPensionPot: number;
  yourContribution: number;
  employerContribution: number;
  currentAge: number;
  retirementAge: number;
  lifestyleGoal: 'Minimum' | 'Moderate' | 'Comfortable';
  targetAmount: number;
}

export interface Plan {
  name: string;
  risk: 'Low' | 'Medium' | 'High' | 'Very-High';
  stockAllocation: number;
  annualReturn: number;
  color: string;
  currentPensionPot: number;
  yourContribution: number;
  employerContribution: number;
  currentAge: number;
  retirementAge: number;
  targetAmount: number;
}

export interface ProjectionResult {
  finalValue: number;
  gap: number;
}

export interface SandboxPlan extends Plan {
    // any specific properties for sandbox can go here
}

export interface Message {
  id: number;
  sender: 'ai' | 'user';
  text?: string;
  component?: React.ReactNode;
} 