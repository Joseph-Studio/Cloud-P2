export function PaginationControls() {
	return (
		<section>
			<h2 className="text-lg font-semibold mb-3 text-black">
				Pagination
			</h2>
			<div className="flex items-center gap-2">
				<button className="px-3 py-1 rounded-md bg-gray-200 text-black">
					Previous
				</button>
				<button className="px-3 py-1 rounded-md bg-gray-200 text-black">
					1
				</button>
				<button className="px-3 py-1 rounded-md bg-gray-200 text-black">
					2
				</button>
				<button className="px-3 py-1 rounded-md bg-gray-200 text-black">
					Next
				</button>
			</div>
		</section>
	);
}
