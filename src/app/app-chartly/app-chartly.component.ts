import { Component } from '@angular/core';
import { FileImportComponent } from '../widgets/file-import/file-import.component';
import { ColumnTypesContainerComponent } from '../widgets/column-types-container/column-types-container.component';
import { AddNewChartComponent } from '../widgets/add-new-chart/add-new-chart.component';
import { ChartListComponent } from '../widgets/chart-list/chart-list.component';
import { ChartContainerComponent } from '../widgets/chart-container/chart-container.component';

@Component({
  selector: 'app-app-chartly',
  standalone: true,
  imports: [
    FileImportComponent,
    ColumnTypesContainerComponent,
    AddNewChartComponent,
    ChartListComponent,
    ChartContainerComponent
  ],
  templateUrl: './app-chartly.component.html',
  styleUrl: './app-chartly.component.scss'
})
export class AppChartlyComponent {

}
