"use client";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	PieChart,
	Pie,
	Cell,
	ScatterChart,
	Scatter,
	ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export function ChartCard({ title, description, data, chartType }) {
	const renderChart = () => {
		if (!data) {
			return (
				<div className="h-40 flex items-center justify-center text-gray-400 text-sm border border-dashed mt-3 rounded-md">
					Chart Placeholder
				</div>
			);
		}

		switch (chartType) {
			case "barChart":
				return (
					<ResponsiveContainer width="100%" height={160}>
						<BarChart data={data}>
							<XAxis dataKey="diet" tick={{ fontSize: 10 }} />
							<YAxis tick={{ fontSize: 10 }} />
							<Tooltip />
							<Bar dataKey="protein" fill="#3B82F6" />
						</BarChart>
					</ResponsiveContainer>
				);

			case "pieChart":
				return (
					<ResponsiveContainer width="100%" height={160}>
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								outerRadius={50}
								fill="#8884d8"
								dataKey="value"
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				);

			case "scatterPlot":
				return (
					<ResponsiveContainer width="100%" height={160}>
						<ScatterChart>
							<XAxis type="number" dataKey="protein" tick={{ fontSize: 10 }} />
							<YAxis type="number" dataKey="carbs" tick={{ fontSize: 10 }} />
							<Tooltip />
							<Scatter data={data.slice(0, 20)} fill="#8B5CF6" />
						</ScatterChart>
					</ResponsiveContainer>
				);

			case "heatmap":
				return (
					<div className="h-40 overflow-auto text-xs mt-3">
						<table className="w-full">
							<tbody>
								{["Protein(g)", "Carbs(g)", "Fat(g)"].map((nutrient) => (
									<tr key={nutrient}>
										<td className="p-1 font-medium">{nutrient.split("(")[0]}</td>
										{["Protein(g)", "Carbs(g)", "Fat(g)"].map((col) => {
											const item = data.find((d) => d.x === col && d.y === nutrient);
											const value = item ? item.value : 0;
											const bgColor =
												value > 0.7
													? "bg-red-200"
													: value > 0.4
													? "bg-yellow-200"
													: "bg-green-200";
											return (
												<td key={col} className={`p-1 text-center ${bgColor}`}>
													{value.toFixed(2)}
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
			<h3 className="font-semibold text-sm mb-1">{title}</h3>
			<p className="text-gray-500 text-sm">{description}</p>
			{renderChart()}
		</div>
	);
}