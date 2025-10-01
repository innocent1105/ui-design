import { LineChart, Line } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

const LineChartComponent = () => {
  const BASE_URL: string = "http://localhost/precision-v2/UI-DESIGN/backend/";
  const user_id = localStorage.getItem("user_id");
  const [statsData, setStatsData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        const res: any = await axios.post(`${BASE_URL}fetch_predictions.php`, data = {
			user_id : user_id
		});

        const dataset = JSON.parse(res.data.dataset);

        // Format dataset into chart-friendly structure
        const chartData = dataset.map((item: any) => ({
          name: item.ds,     // x-axis (date)
          pv: item.yhat,     // prediction value
        }));

        setStatsData(chartData);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    }

    fetchPredictions();
  }, [user_id]);

  return (
    <LineChart width={320} height={120} data={statsData}>
      <Line type="monotone" dataKey="pv" stroke="var(--primary)" strokeWidth={2} />
    </LineChart>
  );
};

export default LineChartComponent;
