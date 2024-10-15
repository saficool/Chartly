import { ChartTypeEnum } from "../enums/chartly.enum";
import { IAvailableChart } from "../interfaces/chartly.interface";

export const AVAILABLE_CHARTS: IAvailableChart[] = [
    {
        chartType: ChartTypeEnum.LINE,
        chartIcon: `
        <svg width="25" height="25" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Axes -->
        <line x1="40" y1="360" x2="360" y2="360" stroke="black" stroke-width="20" />
        <line x1="40" y1="360" x2="40" y2="40" stroke="black" stroke-width="20" />

        <!-- Line Path for the Chart -->
        <polyline fill="none" stroke="blue" stroke-width="15" points="
            40,360
            120,260
            200,160
            280,100
            360,200
        "/>
        </svg>
        `
    },
    {
        chartType: ChartTypeEnum.BAR,
        chartIcon: `
        <svg width="25" height="25" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Axes -->
        <line x1="40" y1="360" x2="360" y2="360" stroke="black" stroke-width="20" />
        <line x1="40" y1="360" x2="40" y2="40" stroke="black" stroke-width="20" />

        <!-- Bars -->
        <rect x="60" y="240" width="50" height="120" fill="blue" />
        <rect x="140" y="180" width="50" height="180" fill="green" />
        <rect x="220" y="120" width="50" height="240" fill="red" />
        <rect x="300" y="80" width="50" height="280" fill="orange" />
        </svg>
        `
    },
    {
        chartType: ChartTypeEnum.SCATTER,
        chartIcon: `
        <svg width="25" height="25" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Axes -->
        <line x1="40" y1="360" x2="360" y2="360" stroke="black" stroke-width="20" />
        <line x1="40" y1="360" x2="40" y2="40" stroke="black" stroke-width="20" />

        <!-- Points -->
        <circle cx="80" cy="280" r="20" fill="blue" />
        <circle cx="160" cy="120" r="20" fill="green" />
        <circle cx="240" cy="200" r="20" fill="red" />
        <circle cx="320" cy="60" r="20" fill="orange" />
    </svg>
        `
    },
    {
        chartType: ChartTypeEnum.PIE,
        chartIcon: `
        <svg width="25" height="25" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Pie Chart Slices -->
        <circle cx="200" cy="200" r="150" fill="lightgray" />
        <path d="M200,200 L200,50 A150,150 0 0,1 350,200 Z" fill="blue" />
        <path d="M200,200 L350,200 A150,150 0 0,1 250,350 Z" fill="red" />
        <path d="M200,200 L250,350 A150,150 0 0,1 200,50 Z" fill="orange" />
        </svg>
        `
    },
    {
        chartType: ChartTypeEnum.CANDLESTICK,
        chartIcon: `
        <svg width="25" height="25" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Axes -->
        <line x1="40" y1="360" x2="360" y2="360" stroke="black" stroke-width="20" />
        <line x1="40" y1="360" x2="40" y2="40" stroke="black" stroke-width="20" />

        <!-- Candlesticks -->
        <rect x="70" y="150" width="40" height="150" fill="green" />
        <line x1="90" y1="80" x2="90" y2="300" stroke="green" stroke-width="10" />

        <rect x="170" y="200" width="40" height="100" fill="red" />
        <line x1="190" y1="120" x2="190" y2="340" stroke="red" stroke-width="10" />
        </svg>
        `
    },
    {
        chartType: ChartTypeEnum.RADAR,
        chartIcon: `
        <svg width="25" height="25" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Axes -->
        <line x1="200" y1="50" x2="200" y2="350" stroke="black" stroke-width="5" />
        <line x1="50" y1="200" x2="350" y2="200" stroke="black" stroke-width="5" />
        <line x1="100" y1="100" x2="300" y2="300" stroke="black" stroke-width="5" />
        <line x1="300" y1="100" x2="100" y2="300" stroke="black" stroke-width="5" />

        <!-- Radar Shape (Enlarged) -->
        <polygon points="200,80 320,160 280,320 120,320 80,160" fill="blue" fill-opacity="0.3" stroke="blue" stroke-width="8" />
        </svg>
        `
    },
    {
        chartType: ChartTypeEnum.BOXPLOT,
        chartIcon: `
        <svg width="25" height="25" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Axes -->
        <line x1="40" y1="360" x2="360" y2="360" stroke="black" stroke-width="10" />
        <line x1="40" y1="360" x2="40" y2="40" stroke="black" stroke-width="10" />
        
        <!-- Whiskers (Enlarged) -->
        <line x1="200" y1="80" x2="200" y2="320" stroke="black" stroke-width="12" />
        
        <!-- Main Box (Enlarged) -->
        <rect x="130" y="140" width="140" height="140" fill="blue" fill-opacity="0.4" />
        
        <!-- Median Line (Thicker) -->
        <line x1="130" y1="210" x2="270" y2="210" stroke="black" stroke-width="12" />
        </svg>
        `
    },
    {
        chartType: ChartTypeEnum.HEATMAP,
        chartIcon: `
        <svg width="25" height="25" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Grid Cells -->
        <rect x="50" y="50" width="100" height="100" fill="red" />
        <rect x="150" y="50" width="100" height="100" fill="orange" />
        <rect x="250" y="50" width="100" height="100" fill="yellow" />
        <rect x="50" y="150" width="100" height="100" fill="green" />
        <rect x="150" y="150" width="100" height="100" fill="blue" />
        <rect x="250" y="150" width="100" height="100" fill="purple" />
        </svg>
        `
    },
    {
        chartType: ChartTypeEnum.GRAPH,
        chartIcon: `<svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Nodes -->
        <circle cx="6" cy="6" r="2" fill="#007BFF"/>
        <circle cx="16" cy="6" r="2" fill="#007BFF"/>
        <circle cx="11" cy="16" r="2" fill="#007BFF"/>
        <!-- Edges -->
        <line x1="6" y1="6" x2="16" y2="6" stroke="#000" stroke-width="1"/>
        <line x1="6" y1="6" x2="11" y2="16" stroke="#000" stroke-width="1"/>
        <line x1="16" y1="6" x2="11" y2="16" stroke="#000" stroke-width="1"/>
        </svg>
        `
    }
]