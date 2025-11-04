export function ChartCard({ title, description }) {
	return (
		<div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
			<h3 className="font-semibold text-sm mb-1">{title}</h3>
			<p className="text-gray-500 text-sm">{description}</p>
			<div className="h-40 flex items-center justify-center text-gray-400 text-sm border border-dashed mt-3 rounded-md">
				Chart Placeholder
			</div>
		</div>
	);
}
