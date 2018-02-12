import { Component, OnInit } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid';
import {countryNameData} from '../country-data';

@Component({
  selector: 'app-country-cell-template',
  template: `<img [alt]="value" [title]="countryDisplayName" src="assets/flags/{{value}}-01.png" class="flag-sc" />`,
  styleUrls: ['./country-cell-template.component.scss']
})
export class CountryCellTemplateComponent implements AgRendererComponent {
  public value: string;
  public countryDisplayName: string;

  refresh(params: any): boolean {
    this.value = params.value;
    this.countryDisplayName = countryNameData.hu[this.value];
    return true;
  }
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
    this.countryDisplayName = countryNameData.hu[this.value];
  }

}
