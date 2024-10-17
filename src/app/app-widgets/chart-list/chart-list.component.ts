import { Component, inject } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { IChartConfiguration } from '../../interfaces/chartly.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ChartTypeEnum } from '../../enums/chartly.enum';
import { LineComponent } from '../chart-forms/line/line.component';
import { BarComponent } from '../chart-forms/bar/bar.component';
import { PieComponent } from '../chart-forms/pie/pie.component';
import { RadarComponent } from '../chart-forms/radar/radar.component';
import { IDynamicDialog, IDynamicDialogConfig } from '../../interfaces/dynamic-dialog.interface';
import { DynamicDialogService } from '../../services/dynamic-dialog.service';
import { StringTransformerService } from '../../services/string-transformer.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-chart-list',
  standalone: true,
  imports: [ConfirmDialogModule],
  templateUrl: './chart-list.component.html',
  styleUrl: './chart-list.component.scss',
  providers: [ConfirmationService]
})
export class ChartListComponent {
  protected chartsService = inject(ChartsService)
  private dynamicDialogService: IDynamicDialog = inject(DynamicDialogService)
  private stringTransformerService = inject(StringTransformerService)
  private confirmationService = inject(ConfirmationService)

  ngOnInit(): void { }

  async editThisChart(chart_configs: IChartConfiguration) {
    const config: DynamicDialogConfig = {
      header: `${this.stringTransformerService.ConvertToTitleCase(chart_configs.type)} Chart`,
      width: '500px',
      height: 'auto',
      closeOnEscape: false,
      modal: true,
      resizable: false,
      draggable: true,
      maximizable: false,
      position: "center"
    }
    var dynamicDialogConfig!: IDynamicDialogConfig
    switch (chart_configs.type) {
      case ChartTypeEnum.LINE:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: LineComponent, config: config };
        break;
      case ChartTypeEnum.BAR:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: BarComponent, config: config };
        break;
      case ChartTypeEnum.PIE:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: PieComponent, config: config };
        break;
      case ChartTypeEnum.RADAR:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: RadarComponent, config: config };
        break;
    }
    this.dynamicDialogService.ShowDialog(dynamicDialogConfig);
  }

  removeThisChart(index: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      // defaultFocus: 'reject',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.chartsService.removeConfiguration(index)
      },
      reject: () => { }
    });

  }

}
