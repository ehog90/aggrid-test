import { Component, OnInit } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {IAfterGuiAttachedParams, ICellRendererParams} from 'ag-grid';

@Component({
  selector: 'app-distance-cell-template',
  template: `<span style="font-weight: bold">{{value}}</span> km`,
  styleUrls: ['./distance-cell-template.component.scss']
})
export class DistanceCellTemplateComponent implements AgRendererComponent {
  public value: number;

  constructor() { }

  refresh(params: any): boolean {
    this.value = params.value.toFixed(2);
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.value = params.value.toFixed(2);
  }
}
