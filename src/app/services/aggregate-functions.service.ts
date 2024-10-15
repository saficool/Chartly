import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AggregateFunctionsService {

    constructor() { }

    public aggregateCountByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: number } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = 0; // Initialize the count
            }

            // Count occurrences of the category
            result[category] += 1; // Increment the count
        });

        // Transform result into the desired output format
        return Object.keys(result).map(category => ({
            category,
            value: result[category], // The count value
            aggregate: "Count" // Hardcoded aggregate type
        }));
    }

    public aggregateSumByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: number } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = 0; // Initialize the sum
            }

            // Sum the numerical values
            result[category] += parseFloat(value); // Add to the sum
        });

        // Transform result into the desired output format
        return Object.keys(result).map(category => ({
            category,
            value: result[category], // The sum value
            aggregate: "Sum" // Hardcoded aggregate type
        }));
    }

    public aggregateAverageByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: { sum: number; count: number } } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Parse the numerical value
            const numericalValue = parseFloat(value);

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = { sum: 0, count: 0 }; // Initialize sum and count
            }

            // Sum the numerical values and count occurrences
            result[category].sum += numericalValue; // Add to the sum
            result[category].count += 1; // Increment the count
        });

        // Transform result into the desired output format
        return Object.keys(result).map(category => ({
            category,
            value: result[category].sum / result[category].count, // Calculate average
            aggregate: "Average" // Hardcoded aggregate type
        }));
    }

    public aggregateMinByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: number } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Parse the numerical value
            const numericalValue = parseFloat(value);

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = numericalValue; // Set the initial minimum value
            } else {
                // Update the minimum value for the category
                result[category] = Math.min(result[category], numericalValue);
            }
        });

        // Transform result into the desired output format
        return Object.keys(result).map(category => ({
            category,
            value: result[category], // The minimum value
            aggregate: "Min" // Hardcoded aggregate type
        }));
    }

    public aggregateMaxByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: number } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Parse the numerical value
            const numericalValue = parseFloat(value);

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = numericalValue; // Set the initial maximum value
            } else {
                // Update the maximum value for the category
                result[category] = Math.max(result[category], numericalValue);
            }
        });

        // Transform result into the desired output format
        return Object.keys(result).map(category => ({
            category,
            value: result[category], // The maximum value
            aggregate: "Max" // Hardcoded aggregate type
        }));
    }

    public aggregateMedianByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: number[] } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Parse the numerical value
            const numericalValue = parseFloat(value);

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = []; // Create an array for values
            }

            // Push the numerical value into the category's array
            result[category].push(numericalValue);
        });

        // Calculate median for each category
        return Object.keys(result).map(category => {
            const values = result[category].sort((a, b) => a - b); // Sort the values
            const length = values.length;
            let median;

            if (length === 0) {
                median = null; // No values
            } else if (length % 2 === 1) {
                // Odd number of values
                median = values[Math.floor(length / 2)];
            } else {
                // Even number of values
                const mid1 = values[length / 2 - 1];
                const mid2 = values[length / 2];
                median = (mid1 + mid2) / 2; // Average of the two middle values
            }

            return {
                category,
                value: median, // The median value
                aggregate: "Median" // Hardcoded aggregate type
            };
        });
    }

    public aggregateModeByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: number[] } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Parse the numerical value
            const numericalValue = parseFloat(value);

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = []; // Create an array for values
            }

            // Push the numerical value into the category's array
            result[category].push(numericalValue);
        });

        // Calculate mode for each category
        return Object.keys(result).map(category => {
            const values = result[category];
            const frequencyMap: { [key: number]: number } = {};

            // Count the frequency of each value
            values.forEach(value => {
                if (frequencyMap[value]) {
                    frequencyMap[value]++;
                } else {
                    frequencyMap[value] = 1;
                }
            });

            // Find the maximum frequency
            let maxFrequency = 0;
            const modes: number[] = [];

            Object.keys(frequencyMap).forEach(key => {
                const frequency = frequencyMap[+key];
                if (frequency > maxFrequency) {
                    maxFrequency = frequency;
                    modes.length = 0; // Clear the modes array
                    modes.push(+key); // Add the new mode
                } else if (frequency === maxFrequency) {
                    modes.push(+key); // Add to modes if it's a tie
                }
            });

            return {
                category,
                value: modes.length === 1 ? modes[0] : modes, // Return a single mode or an array of modes
                aggregate: "Mode" // Hardcoded aggregate type
            };
        });
    }

    public aggregateStandardDeviationByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: number[] } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Parse the numerical value
            const numericalValue = parseFloat(value);

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = []; // Create an array for values
            }

            // Push the numerical value into the category's array
            result[category].push(numericalValue);
        });

        // Calculate standard deviation for each category
        return Object.keys(result).map(category => {
            const values = result[category];
            const n = values.length;

            if (n === 0) {
                return {
                    category,
                    value: null, // No values for this category
                    aggregate: "Standard Deviation"
                };
            }

            // Calculate the mean
            const mean = values.reduce((acc, curr) => acc + curr, 0) / n;

            // Calculate the variance
            const variance = values.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / n;

            // Calculate the standard deviation
            const stdDev = Math.sqrt(variance);

            return {
                category,
                value: stdDev, // The standard deviation value
                aggregate: "Standard Deviation" // Hardcoded aggregate type
            };
        });
    }

    public aggregateVarianceByCategory(data: any[], categoricalFeature: string, numericalFeature: string): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature) return [];

        const result: { [key: string]: number[] } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Parse the numerical value
            const numericalValue = parseFloat(value);

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = []; // Create an array for values
            }

            // Push the numerical value into the category's array
            result[category].push(numericalValue);
        });

        // Calculate variance for each category
        return Object.keys(result).map(category => {
            const values = result[category];
            const n = values.length;

            if (n === 0) {
                return {
                    category,
                    value: null, // No values for this category
                    aggregate: "Variance"
                };
            }

            // Calculate the mean
            const mean = values.reduce((acc, curr) => acc + curr, 0) / n;

            // Calculate the variance
            const variance = values.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / n;

            return {
                category,
                value: variance, // The variance value
                aggregate: "Variance" // Hardcoded aggregate type
            };
        });
    }

    public aggregateQuantilesByCategory(data: any[], categoricalFeature: string, numericalFeature: string, quantileList: number[]): any[] {
        // Validate inputs
        if (!data || data.length === 0) return [];
        if (!categoricalFeature || !numericalFeature || !Array.isArray(quantileList)) return [];

        const result: { [key: string]: number[] } = {};

        data.forEach(item => {
            const category = item[categoricalFeature];
            const value = item[numericalFeature];

            // Skip undefined or null values for the numerical feature
            if (value === undefined || value === null) return;

            // Parse the numerical value
            const numericalValue = parseFloat(value);

            // Initialize the category if it doesn't exist
            if (!result[category]) {
                result[category] = []; // Create an array for values
            }

            // Push the numerical value into the category's array
            result[category].push(numericalValue);
        });

        // Calculate quantiles for each category
        return Object.keys(result).map(category => {
            const values = result[category];

            // Sort values to prepare for quantile calculation
            values.sort((a, b) => a - b);

            // Calculate requested quantiles
            const quantiles: { quantile: number, value: number }[] = quantileList.map(q => {
                const quantileIndex = (q / 100) * (values.length - 1);
                const lowerIndex = Math.floor(quantileIndex);
                const upperIndex = Math.ceil(quantileIndex);
                const weight = quantileIndex - lowerIndex;

                if (lowerIndex === upperIndex) {
                    return { quantile: q, value: values[lowerIndex] };
                }

                const interpolatedValue = values[lowerIndex] + weight * (values[upperIndex] - values[lowerIndex]);
                return { quantile: q, value: interpolatedValue };
            });

            return {
                category,
                quantiles, // Array of quantiles for this category
                aggregate: "Quantiles" // Hardcoded aggregate type
            };
        });
    }
}