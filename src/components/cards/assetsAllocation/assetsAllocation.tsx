import React from 'react';
// 导入 CSS Module 文件，它会返回一个包含所有局部化类名的对象
import styles from './index.module.scss';

interface AssetItem {
  name: string;
  percentage: number;
  color: string;
}

const assets: AssetItem[] = [
  { name: 'Equities', percentage: 60, color: '#2B7CB3' },
  { name: 'Fixed Income', percentage: 26, color: '#1D3B5F' },
  { name: 'Commodities', percentage: 14, color: '#A8C5D9' },
  { name: 'Fund', percentage: 0, color: '#6A7B8E' },
];

const BASE_CIRCLE_SIZE = 240;

const getCircleDiameter = (percentage: number): number => {
  if (percentage === 0) return 0;
  return BASE_CIRCLE_SIZE * Math.sqrt(percentage / 100);
};

const AssetAllocation: React.FC = () => {
  const equities = assets.find(a => a.name === 'Equities');
  const fixedIncome = assets.find(a => a.name === 'Fixed Income');
  const commodities = assets.find(a => a.name === 'Commodities');

  const equitiesDiameter = equities ? getCircleDiameter(equities.percentage) : 0;
  const fixedIncomeDiameter = fixedIncome ? getCircleDiameter(fixedIncome.percentage) : 0;
  const commoditiesDiameter = commodities ? getCircleDiameter(commodities.percentage) : 0;

  const chartContainerWidth = 380;
  const chartContainerHeight = 200;

  const equitiesTop = (chartContainerHeight - equitiesDiameter) / 2;
  const equitiesLeft = 0;

  const fixedIncomeTop = -10;
  const fixedIncomeLeft = equitiesDiameter * 0.7;

  const commoditiesTop = fixedIncomeTop + fixedIncomeDiameter * 0.7;
  const commoditiesLeft = fixedIncomeLeft - (commoditiesDiameter * 0.1);

  return (
    // 使用 styles 对象访问局部化类名
    <div className={styles['asset-allocation-card']}>
      <h2 className={styles['card-title']}>Asset Allocation</h2>
      <div className={styles['card-content']}>
        <div className={styles.legend}> {/* 单个单词的类名可以用点语法 */}
          {assets.map((item) => (
            <div key={item.name} className={styles['legend-item']}>
              <span className={styles['legend-color-box']} style={{ backgroundColor: item.color }}></span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div
          className={styles['chart-container']}
          style={{ width: chartContainerWidth, height: chartContainerHeight }}
        >
          {equities && equitiesDiameter > 0 && (
            <div
              className={styles['chart-circle']}
              style={{
                width: equitiesDiameter,
                height: equitiesDiameter,
                backgroundColor: equities.color,
                top: equitiesTop,
                left: equitiesLeft,
                zIndex: 1,
              }}
            >
              <span>{equities.percentage}%</span>
            </div>
          )}

          {fixedIncome && fixedIncomeDiameter > 0 && (
            <div
              className={styles['chart-circle']}
              style={{
                width: fixedIncomeDiameter,
                height: fixedIncomeDiameter,
                backgroundColor: fixedIncome.color,
                top: fixedIncomeTop,
                left: fixedIncomeLeft,
                zIndex: 2,
              }}
            >
              <span>{fixedIncome.percentage}%</span>
            </div>
          )}

          {commodities && commoditiesDiameter > 0 && (
            <div
              className={styles['chart-circle']}
              style={{
                width: commoditiesDiameter,
                height: commoditiesDiameter,
                backgroundColor: commodities.color,
                top: commoditiesTop,
                left: commoditiesLeft,
                zIndex: 2,
              }}
            >
              <span>{commodities.percentage}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;