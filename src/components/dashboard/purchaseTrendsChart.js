import React from 'react';
import { Bar } from 'react-chartjs-2';

const PurchaseTrendsChart = ({ data, labels, series, options, colors }) => {
  return (
    <div className="chart-wrapper" style={{ height: '400px', marginTop: '60px' }}>
      <Bar
        data={{
          labels: labels,
          datasets: data.map((dataset, index) => ({
            label: series[index],
            data: dataset,
            backgroundColor: colors[index],
          })),
        }}
        options={options}
        height={800}
        style={{ display: 'block', height: '400px', width: '554px' }}
        width={1108}
      />
    </div>
  );
};

export default PurchaseTrendsChart;
