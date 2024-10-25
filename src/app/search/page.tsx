"use client";
import yaml from "@/src/app/components/search-config.yaml";
import { useState } from 'react';

export default function Search() {
    // Log the imported yaml content to verify its structure
    console.log("YAML Content (Facets):", yaml.faceted_search.facets);
    const facetsArrayConfig = yaml?.faceted_search.facets || [];

    return (
        <div className="flex h-screen p-4 sm:p-10 font-sans">

            {/* Sidebar for faceted search */}
            <div className="w-94 bg-white text-gray-800 flex flex-col shadow-md">
                <div className="p-1 border-b border-gray-300">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                {facetsArrayConfig.length > 0 ? (
                    facetsArrayConfig.map((facetItem, index) => {

                        const [rangeValue, setRangeValue] = useState(facetItem.min || 0);

                        const handleRangeChange = (event) => {
                            setRangeValue(event.target.value);
                        };

                        return (
                            <div key={index} className="space-y-1 border-b border-gray-200 pb-4 mb-4">
                                {facetItem.display === "dropdown" && facetItem.options && facetItem.options.length > 0 && (
                                    <div>
                                        <label htmlFor={`facet-${facetItem.slug}`} className="block mb-2">{facetItem.name}</label>
                                        <small>{facetItem.description}</small>
                                        <select
                                            id={`facet-${facetItem.slug}`}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {facetItem.options.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {facetItem.display === "textbox" && (
                                    <div>
                                        <label htmlFor={`facet-${facetItem.slug}`} className="block mb-2">{facetItem.name}</label>
                                        <small className="block mb-1 text-gray-500">{facetItem.description}</small>
                                        <input
                                            type="text"
                                            id={`facet-${facetItem.slug}`}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                    </div>
                                )}
                                {facetItem.display === "range" && (
                                    <div>
                                        <label htmlFor={`facet-${facetItem.slug}`} className="block mb-2">{facetItem.name}</label>
                                        <small className="block mb-1 text-gray-500">{facetItem.description}</small>
                                        <input
                                            id={`facet-${facetItem.slug}`}
                                            type="range"
                                            min={facetItem.min}
                                            max={facetItem.max}
                                            value={rangeValue}
                                            onChange={handleRangeChange}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                        <div className="mt-2 text-sm text-gray-700">Value: {rangeValue}</div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No facets available.</p>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">Search Result</h1>
                <p className="mb-4">this area is used for displaying...</p>

                {/* Display Facets */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Facets</h2>
                    {facetsArrayConfig.length > 0 ? (
                        facetsArrayConfig.map((facetItem, index) => (
                            <div key={index} className="space-y-1 border-b border-gray-200 pb-4 mb-4">
                                <h3 className="text-lg font-medium">{facetItem.name}</h3>
                                <p>Field: {facetItem.field}</p>
                                <p>Type: {facetItem.type}</p>
                                <p>Description: {facetItem.description}</p>
                                <p>Display: {facetItem.display}</p>
                                {facetItem.unit && <p>Unit: {facetItem.unit}</p>}

                                {facetItem.description === "dropdown" && facetItem.options && facetItem.options.length > 0 && (
                                    <div>
                                        <p>Options:</p>
                                        <ul className="list-disc list-inside">
                                            {facetItem.options.map((option, optionIndex) => (
                                                <li key={optionIndex}>{option}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No facets available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
