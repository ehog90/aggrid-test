import { Component, OnInit } from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid";

@Component({
  selector: 'app-locality-cell-template',
  template: `<span *ngIf="value">{{value}}</span><span *ngIf="!value" style="font-style: italic">Nincs</span>`,
  styleUrls: ['./locality-cell-template.component.scss']
})
export class LocalityCellTemplateComponent implements AgRendererComponent {
  public value: string;
  refresh(params: any): boolean {
    this.value = params.value;
    return true;
  }
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }
}
