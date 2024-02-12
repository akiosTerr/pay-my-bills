import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import 'style/chartPage.scss'

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
import { LineChartData, LineChartDataComponent } from "components/interfaces/interfaces";
import { convertDate, flatten, getMonthName, getRangeOfMonths } from "utils/general_utils";
import { getChartData } from "api_actions/history";
import _ from "lodash";
import withAuth from "hoc/PrivateRoute";

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
                    label: function (t) {
                        const label = t.dataset.label + ': R$ ' + String(t.raw)
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

    const [datasets, setDatasets] = useState<LineChartDataComponent>(
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
        }
    )

    const parseChartData = (LineData:LineChartData[]) => {
        const filterList = ['EDP', 'SAEG']
        const colors = ['red','blue','green']

        const filtered = LineData.filter(item => filterList.includes(item.title))
        const dates = filtered.map((item) => {
            const dateList = item.data.map(dataItem => {
                const converted = convertDate(dataItem.expiration)
                const date = new Date(converted)
                return date
            })
           
            return dateList
        })


        const mergedDates = flatten(dates)
        mergedDates.sort((a,b) => {
            //@ts-ignore
            return a - b
        })

        const parsedMonths = mergedDates.map(date => {
            console.log(date.getMonth())
            return getMonthName(date.getMonth())
        })
        const uniqueMonths = _.uniq(parsedMonths)
        const parsedData = filtered.map((item, i) => {
            item.data.sort((a,b) => {
                const a_converted = convertDate(a.expiration)
                const a_date = new Date(a_converted)
                const b_converted = convertDate(b.expiration)
                const b_date = new Date(b_converted)
                //@ts-ignore
                return a_date - b_date
            })
            const lineValues = item.data.map(i => i.value)
            return {
                label: item.title,
                fill: false,
                lineTension: 0.5,
                backgroundColor: colors[i],
                borderColor: colors[i],
                borderWidth: 2,
                data: lineValues,
            }
        })

        const finalLineData = {
            labels: uniqueMonths,
            datasets: parsedData,
        }
        setDatasets(finalLineData)
    }
    useEffect(getChartData(parseChartData),[])

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

export default withAuth(ChartPage);