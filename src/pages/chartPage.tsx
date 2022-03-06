import { useState } from "react";
import { Line } from "react-chartjs-2";
import '../style/chartPage.scss'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

function ChartPage() {
    const options: ChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
                color: "#fff",
            }
          },
          title: {
            display: true,
            text: 'Monthly Cost',
            color: '#fff',
          },
        },
    }
    const [datasets, setDatasets] = useState(
        {
            labels: ['January', 'February', 'March',
                'April', 'May'],
            datasets: [
                {
                    label: 'EDP',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'red',
                    borderColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 80, 81, 56],
                },
                {
                    label: 'SAEG',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'blue',
                    borderColor: '#fff',
                    borderWidth: 2,                    
                    data: [65, 33, 70, 90, 22],
                },
            ]
        }
    )

    return (
        <div className="chart-main">
            <Line
                data={datasets}
                options={options}
                height={100}
            />
        </div>
    );
}

export default ChartPage;