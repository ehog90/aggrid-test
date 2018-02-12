import {Component, Input, OnInit} from '@angular/core';
import {ISimpleLocation} from '../interfaces';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css']
})
export class CurrentLocationComponent implements OnInit {

  @Input() location: ISimpleLocation;
  constructor() { }

  ngOnInit() {
  }

}
