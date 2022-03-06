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
        // TODO: add dollar sign on y-scales
        // I think there is a divergence between the types from chart.js and react-chartjs-2
        // scales: {
        //     y:{
        //         ticks: {
        //             // beginAtZero: true,
        //             callback: function (value:any, index:any, ticks:any) {
        //                 if (Number(value) >= 1000) {
        //                     return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //                 } else {
        //                     return '$' + value;
        //                 }
        //             }
        //         }
        //     }
        // },
        plugins: {
            tooltip: {
                yAlign: 'bottom',
                displayColors: false,
                callbacks: {
                    label: function(t) {
                        const label = t.dataset.label+': R$ '+String(t.raw)
                        return label
                    }
                }
            },
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
                    backgroundColor: '#19d800',
                    borderColor: '#19d800',
                    borderWidth: 2,
                    data: [65, 59, 80, 81, 270],
                },
                {
                    label: 'SAEG',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: '#0004ee',
                    borderColor: '#0004ee',
                    borderWidth: 2,
                    data: [65, 33, 70, 90, 22],
                },
                {
                    label: 'ULTRAGAZ',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 2,
                    data: [33, 24, 60, 68, 75],
                },
            ]
        })

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