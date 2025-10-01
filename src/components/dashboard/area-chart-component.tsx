import React, { useEffect, useState } from "react";
import axios from 'axios';
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const BASE_URL = "http://localhost/precision-v2/UI-DESIGN/backend/";
  const user_id = localStorage.getItem("user_id");
  const [dates, setDates] = useState([]);
  const [yValues, setYvalues] = useState([]);
  const [yValues2, setYvalues2] = useState([]); 
  
  useEffect(() => {
	async function fetchPredictions() {
	  const res = await axios.post(`${BASE_URL}fetch_predictions.php`, { data: { user_id } });
	  let dataset = JSON.parse(res.data.dataset);  
	  const predictions = JSON.parse(res.data.predictions); 
		
	  const firstDate = predictions[0].ds;
	  const firstPred = predictions[0].yhat;
	
	  dataset.push({
		ds : firstDate,
		y : firstPred
	  })

	  const allDates = [
		...dataset.map(d => dayjs(d.ds).format("MMM YYYY")),
		...predictions.map(d => dayjs(d.ds).format("MMM YYYY"))
	  ];
  
	  const yActuals = [
		...dataset.map(d => Number(d.y)),
		...Array(predictions.length).fill(null)
	  ];
  

	  const yPreds = [
		...Array(dataset.length -1).fill(null),
		...predictions.map(d => Number(d.yhat))
	  ];
  
	  setDates(allDates);
	  setYvalues(yActuals);
	  setYvalues2(yPreds);
	}
  
	fetchPredictions();
  }, []);
  
  
  const data = {
	labels: dates,
	datasets: [
	  {
		label: "Actual revenue",
		data: yValues,
		borderColor: "#B9D9EB",
		backgroundColor: "#76ABDF",
		tension: 0.3,
	  },
	  {
		label: "Predictions",
		data: yValues2,
		borderColor: "#4169E1",
		backgroundColor: "#4169E1",
		tension: 0.3,
	  }
	],
  };
  

  const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
	  legend: { 
		position: "top",
		labels: { color: "#888", font: { size: 14 }, usePointStyle: true }
	  },
	  title: { display: true, text: "Revenue Forecast", color: "#888", font: { size: 16, weight: "bold" } },
	  tooltip: { mode: "index", intersect: false }
	},
	scales: {
	  x: {
		grid: { color: "#5961781f" },
		ticks: { color: "#5b6a94e6", font: { size: 12 } }
	  },
	  y: {
		grid: { color: "#5961781f" },
		ticks: { color: "#5b6a94e6", font: { size: 12 }, beginAtZero: true }
	  }
	}
  };
  
  return (
    <div className="w-full h-96"> 
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
