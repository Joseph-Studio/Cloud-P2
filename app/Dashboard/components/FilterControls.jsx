export function FilterControls() {
	return (
		<section>
			<h2 className="text-lg font-semibold mb-3 text-black">
				Filters and Data Interaction
			</h2>
			<div className="flex flex-wrap items-center gap-3 mb-10 text-black">
				<input
					type="text"
					placeholder="Search by Diet Type"
					className="border border-gray-300 rounded-md px-3 py-2 text-sm"
				/>
				<select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-black">
					<option>All Diet Types</option>
				</select>
			</div>
		</section>
	);
}
