import { Component, OnInit, Input } from '@angular/core';
import {Resource} from '../resource.model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  constructor() { }

  @Input() resource: Resource;

  ngOnInit(): void {
  }

}
