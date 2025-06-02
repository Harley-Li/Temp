import React, { useState, useEffect, useMemo } from 'react';
import styles from './index.module.scss';

// 定义数据项的类型
interface DataItem {
  label: string; // 显示的标签，如 'S', 'M', 'Jan', 'Feb'
  value: number; // 收入值
  index: number; // 用于标识在数组中的位置
}

const IncomeTracker: React.FC = () => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [data, setData] = useState<DataItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0); // 突出显示的数据项索引

  // 模拟周数据
  const generateWeekData = useMemo(() => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return days.map((day, i) => ({
      label: day,
      value: Math.floor(Math.random() * 2000) + 500 + (i === 2 ? 1000 : 0), // 周二的收入高一些
      index: i,
    }));
  }, []);

  // 模拟月数据 (过去12个自然月)
  const generateMonthData = useMemo(() => {
    const months: DataItem[] = [];
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11
    const currentYear = today.getFullYear();

    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, currentMonth - (11 - i), 1); // 从12个月前开始，直到当前月
      months.push({
        label: date.toLocaleString('default', { month: 'short' }),
        value: Math.floor(Math.random() * 10000) + 2000 + (i === 11 ? 5000 : 0), // 最近的月收入高一些
        index: i,
      });
    }
    return months;
  }, []);

  useEffect(() => {
    if (viewMode === 'week') {
      setData(generateWeekData);
      setHighlightedIndex(2); // 默认选中周二
    } else {
      setTimeout(() => {
         setData(generateMonthData);
        setHighlightedIndex(generateMonthData.length - 1); // 默认选中最近的一个月
      }, 300)
    }
  }, [viewMode, generateWeekData, generateMonthData]);

  // 根据数据值计算线条高度
  const maxIncome = useMemo(() => {
    return data.length > 0 ? Math.max(...data.map(item => item.value)) : 1;
  }, [data]);

  // 动态卡片宽度
  const cardWidth = viewMode === 'month' ? 'calc(100% - 40px)' : 'auto'; // 月模式下加宽，或者设置一个更大的固定值

  return (
    <div className={`${styles.card} ${viewMode ==='week'? styles.week : styles.month}`}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div>
            <h1 className={styles.title}>Income Tracker</h1>
            <p className={styles.description}>
              Track changes in income over time and access detailed data on each project and payments received
            </p>
          </div>
        </div>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleButton} ${viewMode === 'week' ? styles.active : ''}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button
            className={`${styles.toggleButton} ${viewMode === 'month' ? styles.active : ''}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
        </div>
      </div>

      <div className={`${styles.dataContainer} ${viewMode ==='week'? styles.week : styles.month}`}>
              <div className={styles.footer}>
        <div className={styles.percentageChange}>
          +20%
        </div>
        <p className={styles.footerText}>
          This week's income is higher than last week's
        </p>
      </div>    
         <div className={styles.chartContainer}>
        {data.map((item, i) => {
          const isHighlighted = i === highlightedIndex;
          // 根据收入值占最大值的比例计算高度
          const lineHeight = (item.value / maxIncome) * (viewMode === 'week' ? 120 : 180); // 月模式下柱子高一些
          
          return (
            <div
              key={item.label + i}
              className={`${styles.chartColumn} ${isHighlighted ? styles.highlightedColumn : ''}`}
              onClick={() => setHighlightedIndex(i)}
            >
              {isHighlighted && (
                <div className={styles.tooltip}>
                  ${item.value.toLocaleString()}
                </div>
              )}
              <div className={styles.line} style={{ height: `${lineHeight}px` }}></div>
              <div className={`${styles.dot} ${isHighlighted ? styles.highlightedDot : ''}`}></div>
              <div className={`${styles.label} ${isHighlighted ? styles.highlightedLabel : ''}`}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

 
      </div>


    </div>
  );
};

export default IncomeTracker;