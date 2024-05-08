import { Bar } from 'react-chartjs-2';

const Stats = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Cantidad',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(data),
      },
    ],
  };

  return (
    <div className="stats">
      <div className="stats-name">Flujo de personas</div>
      <div className="stats-dias">
        <Bar
          data={chartData}
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
              }],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
