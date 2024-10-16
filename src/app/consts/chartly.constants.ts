import { BarComponent } from "../app-widgets/chart-forms/bar/bar.component";
import { LineComponent } from "../app-widgets/chart-forms/line/line.component";
import { PieComponent } from "../app-widgets/chart-forms/pie/pie.component";
import { RadarComponent } from "../app-widgets/chart-forms/radar/radar.component";
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
        `,
        chartFormTemplate: LineComponent,
        isMultiSeriesChart: true
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
        `,
        chartFormTemplate: BarComponent,
        isMultiSeriesChart: true
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
        `,
        chartFormTemplate: PieComponent,
        isMultiSeriesChart: false
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
        `,
        chartFormTemplate: RadarComponent,
        isMultiSeriesChart: true
    }
]