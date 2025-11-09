import { ChartCard } from "./ChartCard";

const chartConfigs = [
	{
		title: "Bar Chart",
		description: "Average macronutrient content by diet type.",
		type: "barChart",
	},
	{
		title: "Scatter Plot",
		description: "Nutrient relationships (e.g., protein vs carbs).",
		type: "scatterPlot",
	},
	{
		title: "Heatmap",
		description: "Nutrient correlations.",
		type: "heatmap",
	},
	{
		title: "Pie Chart",
		description: "Recipe distribution by diet type.",
		type: "pieChart",
	},
];

export function ChartsGrid({ chartData }) {
	return (
		<section>
			<h2 className="text-xl font-semibold mb-4 text-black">
				Explore Nutritional Insights
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-black">
				{chartConfigs.map((config) => (
					<ChartCard
						key={config.title}
						title={config.title}
						description={config.description}
						data={chartData ? chartData[config.type].data : null}
						chartType={config.type}
					/>
				))}
			</div>
		</section>
	);
}