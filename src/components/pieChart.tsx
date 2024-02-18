import { FunctionComponent } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { HistoryItemType } from "./interfaces/interfaces";
import { cloneDeep } from "lodash";
import type { ChartOptions } from 'chart.js';


Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const template_data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#00FF00",
        "#00FFFF",
        "#FF00FF",
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#00FF00",
        "#00FFFF",
        " #FF00FF",
      ],
    },
  ],
};

type pieData = {
  labels: string[];
  datasets: datasetType[];
};

interface PieChartComponentProps {
  historyData: HistoryItemType[];
}

interface datasetType {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

const options:ChartOptions<'pie'> = {
  color: "#fff",
};

const getPieDataHistory = (
  historyData: HistoryItemType[],
  pieChartData: pieData
) => {
  const pieData = historyData.map((i) => {
    const { title, value } = i;
    return {
      title,
      value,
    };
  });
  pieChartData.labels = pieData.map((i) => i.title);
  pieChartData.datasets[0].data = pieData.map((i) => Number(i.value));

  return pieChartData;
};

const PieChartComponent: FunctionComponent<PieChartComponentProps> = ({
  historyData,
}: PieChartComponentProps) => {
  const pieChartData = cloneDeep(template_data);
  const formatedData = getPieDataHistory(historyData, pieChartData);
  return (
    <div className="pie-container" >
      <Pie data={formatedData} options={options} />
    </div>
  );
};

export default PieChartComponent;
