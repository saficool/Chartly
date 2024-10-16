import { Component } from '@angular/core';
import { HeaderComponent } from '../app-widgets/header/header.component';
import { FileImportComponent } from '../app-widgets/file-import/file-import.component';
import { AddNewChartComponent } from '../app-widgets/add-new-chart/add-new-chart.component';
import { ChartListComponent } from '../app-widgets/chart-list/chart-list.component';
import { ChartContainerComponent } from '../app-widgets/chart-container/chart-container.component';

@Component({
  selector: 'app-app-chartly',
  standalone: true,
  imports: [
    HeaderComponent,
    FileImportComponent,
    AddNewChartComponent,
    ChartListComponent,
    ChartContainerComponent
  ],
  templateUrl: './app-chartly.component.html',
  styleUrl: './app-chartly.component.scss'
})
export class AppChartlyComponent {

}
