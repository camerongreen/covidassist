import {Component,  OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchDetailsService} from '../search-details.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  searchForm: FormGroup;

  states = [
    'Queensland',
    'South Australia',
    'West Australia'
  ];

  userStatuses = [
    'unemployed',
    'business',
    'retired',
  ];

  constructor(
    private searchDetailsService: SearchDetailsService
  ) {
    this.searchForm = this.makeForm();
  }

  ngOnInit(): void {
  }

  makeForm(): FormGroup {
    return new FormGroup({
      state: new FormControl(),
      userStatus: new FormControl()
    });
  }

  submit() {
    console.log(this.searchForm.value);
    this.searchDetailsService.searchRequest(this.searchForm.value);
  }
}
