import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ChartDataManagerService } from '../../services/chart-data-manager.service';
import { IChartDataManager } from '../../interfaces/chartly.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ViewChartDataComponent } from '../view-chart-data/view-chart-data.component';
import { IDynamicDialog, IDynamicDialogConfig } from '../../interfaces/dynamic-dialog.interface';
import { DynamicDialogService } from '../../services/dynamic-dialog.service';
import { ColumnTypesContainerComponent } from '../column-types-container/column-types-container.component';

@Component({
  selector: 'app-file-import',
  standalone: true,
  imports: [],
  templateUrl: './file-import.component.html',
  styleUrl: './file-import.component.scss'
})
export class FileImportComponent {
  protected acceptFileType = ".csv"
  @ViewChild('fileInput') fileInput!: ElementRef;
  protected loading: boolean = false
  protected fileUploaded: boolean = false

  // Dependency Injection
  chartDataService: IChartDataManager = inject(ChartDataManagerService)
  dynamicDialogService: IDynamicDialog = inject(DynamicDialogService)

  ngOnInit(): void { }

  protected onFileChange(event: any) {
    const file: File = event.target.files[0];
    this.chartDataService.ClearChartData()
    this.fileUploaded = false
  }

  protected async importFile() {
    this.fileUploaded = false
    const file: File = this.fileInput.nativeElement.files[0]
    if (file) {
      this.loading = true
      await this.chartDataService.ImportFile(file)
        .then(data => { this.loading = false; this.fileUploaded = true })
        .catch(data => { this.loading = false; this.fileUploaded = false })
    }
  }

  protected viewChartData() {
    const config: DynamicDialogConfig = {
      header: "View Data",
      width: 'auto',
      closeOnEscape: false,
      modal: true,
      resizable: true,
      draggable: false,
      maximizable: true,
      position: "center"
    }
    const dynamicDialogConfig: IDynamicDialogConfig = {
      component: ViewChartDataComponent,
      config: config
    }
    this.dynamicDialogService.ShowDialog(dynamicDialogConfig);
  }

  protected viewHeaders() {
    const config: DynamicDialogConfig = {
      header: "Headers",
      width: '400px',
      closeOnEscape: false,
      modal: true,
      resizable: false,
      draggable: true,
      maximizable: false,
      position: "center"
    }
    const dynamicDialogConfig: IDynamicDialogConfig = {
      component: ColumnTypesContainerComponent,
      config: config
    }
    this.dynamicDialogService.ShowDialog(dynamicDialogConfig);
  }
}
