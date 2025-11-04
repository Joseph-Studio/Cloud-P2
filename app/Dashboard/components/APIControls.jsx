export function APIControls() {
	const buttons = [
		{ label: "Get Nutritional Insights", color: "blue" },
		{ label: "Get Recipes", color: "green" },
		{ label: "Get Clusters", color: "purple" },
	];

	return (
		<section>
			<h2 className="text-lg font-semibold mb-3 text-black">
				API Data Interaction
			</h2>
			<div className="flex flex-wrap gap-3 mb-10">
				{buttons.map((button) => (
					<button
						key={button.label}
						className={`bg-${button.color}-600 text-white px-4 py-2 rounded-md hover:bg-${button.color}-700 text-sm`}
					>
						{button.label}
					</button>
				))}
			</div>
		</section>
	);
}
