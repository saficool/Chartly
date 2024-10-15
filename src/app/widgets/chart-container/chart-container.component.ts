import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { ChartComponent } from '../chart/chart.component';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, ChartComponent],
  templateUrl: './chart-container.component.html',
  styleUrl: './chart-container.component.scss',
  providers: [provideEcharts(),]
})
export class ChartContainerComponent {

  protected chartsService = inject(ChartsService)

  ngOnInit(): void {
  }
}
