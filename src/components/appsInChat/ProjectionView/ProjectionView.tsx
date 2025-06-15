import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Plan, UserInput } from '../../../types';
import { calculateProjection, generateProjectionData } from '../../../services/calculation';
import styles from './ProjectionView.module.scss';

interface ProjectionViewProps {
  plans: { [key: string]: Plan };
  userInput: UserInput;
  onGoToSandbox: () => void;
}

const ProjectionView: React.FC<ProjectionViewProps> = ({ plans, userInput, onGoToSandbox }) => {

    const getChartOption = () => {
        const maxAge = 70;
        const maxYears = maxAge - userInput.currentAge;
        const xAxisData = Array.from({ length: maxYears + 1 }, (_, i) => `Age ${userInput.currentAge + i}`);

        const series = Object.values(plans).map(plan => ({
            name: plan.name,
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            data: generateProjectionData(plan, maxYears),
            lineStyle: {
                color: plan.color,
                width: plan.name === 'Sandbox' ? 3 : 2,
                type: plan.name === 'Sandbox' ? 'dashed' : 'solid',
            },
        }));

        return {
            title: { text: 'Retirement Savings Projection', left: 'center', textStyle: { fontSize: 16, color: '#333', fontWeight: 500 } },
            tooltip: { trigger: 'axis', valueFormatter: (value: number) => `£${(value / 1000).toFixed(1)}k` },
            legend: { data: Object.values(plans).map(p => p.name), bottom: 0, icon: 'circle', itemGap: 15 },
            grid: { left: '12%', right: '8%', bottom: '15%', top: '20%' },
            xAxis: { type: 'category', boundaryGap: false, data: xAxisData, axisLine: { lineStyle: { color: '#ccc' } }, axisTick: { show: false } },
            yAxis: { type: 'value', axisLabel: { formatter: (v: number) => `£${v / 1000}k` }, splitLine: { lineStyle: { type: 'dashed', color: '#eee' } } },
            series: series
        };
    }

    const tableRows = Object.values(plans).filter(p => p.name !== 'Sandbox').map(plan => {
        const result = calculateProjection(plan);
        const gapText = result.gap > 0 ?
            <span className="gap-negative">-£{(result.gap / 1000).toFixed(1)}k</span> :
            <span className="gap-positive">+£{(Math.abs(result.gap) / 1000).toFixed(1)}k</span>;

        const riskClass = `riskLevel${plan.risk.replace(' ', '-')}`;

        return (
            <tr key={plan.name}>
                <td>{plan.name}</td>
                <td>{plan.stockAllocation * 100}%</td>
                <td>{(plan.annualReturn * 100).toFixed(1)}%</td>
                <td><span className={`${styles.riskLevel} ${styles[riskClass]}`}>{plan.risk}</span></td>
                <td>{gapText}</td>
            </tr>
        );
    });

    return (
        <div>
            <div className={styles.chartContainer}>
                <ReactECharts option={getChartOption()} style={{ height: '100%', width: '100%' }} />
            </div>
            <table className={styles.planComparisonTable}>
                <thead>
                    <tr>
                        <th>Plan</th>
                        <th>Equity Allocation</th>
                        <th>Est. Annual Return</th>
                        <th>Risk Level</th>
                        <th>Surplus / Shortfall</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            <div className={styles.formActions}>
                <button onClick={onGoToSandbox} className={styles.actionButton}>
                    Explore in Retirement Sandbox
                </button>
            </div>
        </div>
    );
};

export default ProjectionView; 