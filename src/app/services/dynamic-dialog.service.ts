import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDynamicDialogConfig } from '../interfaces/dynamic-dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class DynamicDialogService {

  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) { }

  ShowDialog(dynamicDialogConfig: IDynamicDialogConfig): void {
    this.ref = this.dialogService.open(dynamicDialogConfig.component, dynamicDialogConfig.config);
  }
}
