import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.sass']
})
export class FilterFormComponent implements OnInit {
  @Output() valueFilterEvent = new EventEmitter<string>();
  @Input() countriesList: Array<ICountryModel>

  public filterForm: FormGroup;
  public hasError = false;

  public timezoneValue = ''

  constructor(private countryService: CountryService) {
    this.countriesList = []
    this.filterForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      locationName: new FormControl(null, [Validators.required,]),
      locationNameTeam: new FormControl(null, [Validators.required,]),
    });
  }

  get name(): any { return this.filterForm.get('name'); }
  get locationName(): any { return this.filterForm.get('locationName'); }


  ngOnInit(): void {
  }

  getTimezone({ code }:ICountryModel): void {
    this.timezoneValue = this.countryService.findTimeZoneByCode(code, this.countriesList)
  }

  updateState(){
    
  }

}
