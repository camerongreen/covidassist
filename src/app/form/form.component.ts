import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchDetailsService} from '../search-details.service';
import {DataSourceService} from '../data-source.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  searchForm: FormGroup;

  states = [
    {name: 'qld', friendly_name: 'Queensland'},
    {name: 'sa', friendly_name: 'South Australia'},
    {name: 'tas', friendly_name: 'Tasmania'},
    {name: 'wa:', friendly_name: 'West Australia'},
    {name: 'aus', friendly_name: 'Federal'}
  ];

  categories: string[] = [];

  constructor(
    private searchDetailsService: SearchDetailsService,
    private dataSourceService: DataSourceService
  ) {
    this.searchForm = this.makeForm();
  }

  ngOnInit(): void {
    this.categories = this.dataSourceService.getCategories();
  }

  makeForm(): FormGroup {
    return new FormGroup({
      state: new FormControl(),
      category: new FormControl()
    });
  }

  submit() {
    this.searchDetailsService.searchRequest(this.searchForm.value);
  }
}
