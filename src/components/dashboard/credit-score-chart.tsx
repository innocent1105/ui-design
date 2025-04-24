import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ICreditScoreChartProps {
	score: number;
}

const CreditScoreCard: React.FC<ICreditScoreChartProps> = ({ score }) => {
	const options: ApexOptions = {
		colors: ['var(--primary)'],
		chart: {
			fontFamily: 'Outfit, sans-serif',
			type: 'radialBar',
			height: 330,
			sparkline: {
				enabled: true
			}
		},
		plotOptions: {
			radialBar: {
				startAngle: -85,
				endAngle: 85,
				hollow: {
					size: '80%'
				},
				track: {
					background: 'var(--chart-5)',
					strokeWidth: '100%',
					margin: 5 // margin is in pixels
				},
				dataLabels: {
					name: {
						show: false
					},
					value: {
						fontSize: '36px',
						fontWeight: '600',
						offsetY: -40,
						color: 'var(--foreground)',
						formatter: function (val) {
							return val + '%';
						}
					}
				}
			}
		},
		fill: {
			type: 'solid',
			colors: ['var(--primary)']
		},
		stroke: {
			lineCap: 'round'
		},
		labels: ['Progress']
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full">
				<Chart options={options} series={[score]} type="radialBar" height={330} />
			</div>
			<p className="mt-5 text-sm">Monthly Target Progress</p>
			<p className="mt-2 text-sm">You are on track to meet your monthly goals</p>
		</div>
	);
};

export default CreditScoreCard;
