import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Plan, UserInput } from '../../../types/index';
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
            symbol: 'circle',
            symbolSize: 0,
            showSymbol: false,
            data: generateProjectionData(plan, maxYears),
            lineStyle: {
                color: plan.color,
                width: plan.name === 'Sandbox' ? 4 : 3,
                type: plan.name === 'Sandbox' ? 'dashed' : 'solid',
                shadowColor: plan.color,
                shadowBlur: 5
            },
            emphasis: {
                focus: 'series',
                lineStyle: {
                    width: plan.name === 'Sandbox' ? 6 : 5
                },
                itemStyle: {
                    color: plan.color
                }
            }
        }));

        return {
            title: { 
                text: 'Retirement Savings Projection', 
                left: 'center', 
                textStyle: { fontSize: 16, color: '#ffffff', fontWeight: 500 } 
            },
            tooltip: { 
                trigger: 'axis', 
                valueFormatter: (value: number) => `£${(value / 1000).toFixed(1)}k`,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                textStyle: { color: '#ffffff' }
            },
            legend: { 
                data: Object.values(plans).map(p => p.name),
                bottom: 10,
                itemGap: 30,
                itemWidth: 14,
                itemHeight: 14,
                textStyle: { 
                    color: '#ffffff', 
                    fontSize: 13, 
                    fontWeight: 500,
                    padding: [3, 5, 3, 5],
                    lineHeight: 20
                },
                icon: 'circle',
                orient: 'horizontal',
                selectedMode: true,
                inactiveColor: 'rgba(255, 255, 255, 0.3)',
                padding: [8, 15, 8, 15],
                borderRadius: 8,
                formatter: (name: string) => {
                    return name;
                },
                left: 'center',
                zlevel: 10
            },
            grid: { left: '12%', right: '8%', bottom: '25%', top: '20%' },
            xAxis: { 
                type: 'category', 
                boundaryGap: false, 
                data: xAxisData, 
                axisLine: { lineStyle: { color: '#888' } }, 
                axisTick: { show: false }, 
                axisLabel: { color: '#ffffff', fontSize: 11 } 
            },
            yAxis: { 
                type: 'value', 
                axisLabel: { formatter: (v: number) => `£${v / 1000}k`, color: '#ffffff', fontSize: 11 }, 
                splitLine: { lineStyle: { type: 'dashed', color: 'rgba(255, 255, 255, 0.2)' } } 
            },
            series: series
        };
    }

    const tableRows = Object.values(plans).filter(p => p.name !== 'Sandbox').map(plan => {
        const result = calculateProjection(plan);
        const gapText = result.gap > 0 ?
            <span className={styles.gapNegative}>-£{(result.gap / 1000).toFixed(1)}k</span> :
            <span className={styles.gapPositive}>+£{(Math.abs(result.gap) / 1000).toFixed(1)}k</span>;

        const riskClass = `riskLevel${plan.risk.replace(' ', '-')}`;

        return (
            <tr key={plan.name}>
                <td className={styles.planName}>{plan.name}</td>
                <td>{plan.stockAllocation * 100}%</td>
                <td>{(plan.annualReturn * 100).toFixed(1)}%</td>
                <td><span className={`${styles.riskLevel} ${styles[riskClass]}`}>{plan.risk}</span></td>
                <td>{gapText}</td>
            </tr>
        );
    });

    return (
        <div className={styles.projectionContainer}>
            <h4>Investment Path Comparison</h4>
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