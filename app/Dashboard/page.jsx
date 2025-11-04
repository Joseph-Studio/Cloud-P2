"use client";
import React from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardFooter } from "./components/DashboardFooter";
import { ChartsGrid } from "./components/ChartsGrid";
import { FilterControls } from "./components/FilterControls";
import { APIControls } from "./components/APIControls";
import { PaginationControls } from "./components/PaginationControls";

export default function NutritionalInsights() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<DashboardHeader title="Nutritional Insights" />

			<main className="px-8 py-8 grow">
				<ChartsGrid />
				<FilterControls />
				<APIControls />
				<PaginationControls />
			</main>

			<DashboardFooter />
		</div>
	);
}
