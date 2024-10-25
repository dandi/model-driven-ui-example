"use client";
import yaml from "@/src/app/components/search-config.yaml";
import { useState } from 'react';

export default function Search() {
    console.log("YAML Content (Facets):", yaml.faceted_search.facets);
    const facetsArrayConfig = yaml?.faceted_search.facets || [];

    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen bg-gray-100 p-8 pb-20 gap-8 sm:p-16 font-sans">
            {/* Search Header */}
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full  p-5 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar for Faceted Search */}
                <aside className="w-full lg:w-80 bg-white p-5 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Filter Options</h2>
                    {facetsArrayConfig.length > 0 ? (
                        facetsArrayConfig.map((facetItem, index) => {
                            const [rangeValue, setRangeValue] = useState(facetItem.min || 0);

                            const handleRangeChange = (event) => {
                                setRangeValue(event.target.value);
                            };

                            return (
                                <div key={index} className="space-y-2 border-b border-gray-200 pb-4 mb-4">
                                    <label className="block font-medium text-gray-600 mb-1">{facetItem.name}</label>
                                    <small className="text-gray-500">{facetItem.description}</small>

                                    {/* Dropdown */}
                                    {facetItem.display === "dropdown" && facetItem.options && (
                                        <select
                                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {facetItem.options.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    )}

                                    {/* Textbox */}
                                    {facetItem.display === "textbox" && (
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}

                                    {/* Range */}
                                    {facetItem.display === "range" && (
                                        <div>
                                            <input
                                                type="range"
                                                min={facetItem.min}
                                                max={facetItem.max}
                                                value={rangeValue}
                                                onChange={handleRangeChange}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                            <div className="text-sm text-gray-600 mt-2">Value: {rangeValue}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500">No facets available.</p>
                    )}
                </aside>

                {/* Main Content */}
                <section className="flex-1 p-6 bg-white shadow-lg rounded-lg overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-6 text-gray-700">Search Results</h1>
                    <p className="mb-4 text-gray-600">This area is used for displaying search results based on selected filters.</p>

                    {/* Display Facets Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Facet Details</h2>
                        {facetsArrayConfig.length > 0 ? (
                            facetsArrayConfig.map((facetItem, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                                    <h3 className="text-lg font-medium text-gray-800">{facetItem.name}</h3>
                                    <p className="text-gray-600">Field: {facetItem.field}</p>
                                    <p className="text-gray-600">Type: {facetItem.type}</p>
                                    <p className="text-gray-600">Description: {facetItem.description}</p>
                                    <p className="text-gray-600">Display: {facetItem.display}</p>
                                    {facetItem.unit && <p className="text-gray-600">Unit: {facetItem.unit}</p>}

                                    {facetItem.display === "dropdown" && facetItem.options && (
                                        <ul className="list-disc list-inside text-gray-600 mt-1">
                                            {facetItem.options.map((option, optionIndex) => (
                                                <li key={optionIndex}>{option}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No facets available.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
