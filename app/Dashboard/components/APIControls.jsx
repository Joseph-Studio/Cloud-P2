export function APIControls({ onFetch, loading }) {
	const buttons = [
		{ label: "Get Nutritional Insights", color: "blue", action: onFetch },
		{ label: "Get Recipes", color: "green" },
		{ label: "Get Clusters", color: "purple" },
	];

	return (
		<section>
			<h2 className="text-lg font-semibold mb-3 text-black">
				API Data Interaction
			</h2>
			<div className="flex flex-wrap gap-3 mb-10">
				{buttons.map((button, index) => (
					<button
						key={button.label}
						onClick={button.action}
						disabled={loading && index === 0}
						className={`bg-${button.color}-600 text-white px-4 py-2 rounded-md hover:bg-${button.color}-700 text-sm ${
							loading && index === 0 ? "opacity-50 cursor-wait" : ""
						}`}
					>
						{loading && index === 0 ? "Loading..." : button.label}
					</button>
				))}
			</div>
		</section>
	);
}