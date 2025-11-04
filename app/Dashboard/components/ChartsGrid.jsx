import { ChartCard } from "./ChartCard";

const chartConfigs = [
	{
		title: "Bar Chart",
		description: "Average macronutrient content by diet type.",
	},
	{
		title: "Scatter Plot",
		description: "Nutrient relationships (e.g., protein vs carbs).",
	},
	{
		title: "Heatmap",
		description: "Nutrient correlations.",
	},
	{
		title: "Pie Chart",
		description: "Recipe distribution by diet type.",
	},
];

export function ChartsGrid() {
	return (
		<section>
			<h2 className="text-xl font-semibold mb-4 text-black">
				Explore Nutritional Insights
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-black">
				{chartConfigs.map((config) => (
					<ChartCard key={config.title} {...config} />
				))}
			</div>
		</section>
	);
}
