import { Component, Type } from "@angular/core";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

export interface IDynamicDialogConfig {
    component: Type<any>,
    config: DynamicDialogConfig
}
export interface IDynamicDialog {
    ShowDialog(dynamicDialogConfig: IDynamicDialogConfig): void
}