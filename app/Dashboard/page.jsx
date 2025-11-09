"use client";
import React, { useState } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardFooter } from "./components/DashboardFooter";
import { ChartsGrid } from "./components/ChartsGrid";
import { FilterControls } from "./components/FilterControls";
import { APIControls } from "./components/APIControls";
import { PaginationControls } from "./components/PaginationControls";

export default function NutritionalInsights() {
	const [fullData, setFullData] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch("https://diet-analysis2025-g5etcja7h7a4afd6.westus2-01.azurewebsites.net/api/processnutrition");
			const data = await response.json();
			setFullData(data); 
		} catch (error) {
			console.error("Error:", error);
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<DashboardHeader title="Nutritional Insights" />

			<main className="px-8 py-8 grow">
				<ChartsGrid chartData={fullData ? fullData.charts : null} />
				<FilterControls />
				<APIControls onFetch={fetchData} loading={loading} />
				<PaginationControls />

				{/* Metadata Display */}
				{fullData && (
					<section className="mt-10">
						<h2 className="text-lg font-semibold mb-3 text-black">
							Function Metadata
						</h2>
						<div className="bg-white rounded-lg shadow p-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-black">
								<div>
									<p className="text-sm text-gray-600">Execution Time</p>
									<p className="text-xl font-bold text-blue-600">
										{fullData.execution_time_seconds}s
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Total Records</p>
									<p className="text-xl font-bold text-green-600">
										{fullData.metadata.total_records.toLocaleString()}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Diet Types</p>
									<p className="text-xl font-bold text-purple-600">
										{fullData.metadata.diet_types}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Data Source</p>
									<p className="text-sm font-semibold text-orange-600 mt-2">
										{fullData.metadata.data_source}
									</p>
								</div>
							</div>
						</div>
					</section>
				)}
			</main>

			<DashboardFooter />
		</div>
	);
}