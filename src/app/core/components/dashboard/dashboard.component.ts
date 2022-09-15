import { Component, OnInit } from '@angular/core';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  listOfCountries: Array<ICountryModel> = []

  constructor(
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.FillCars()
  }

  async FillCars(): Promise<void> {
    this.listOfCountries = await this.countryService.getAllOrderCountries()
    console.log('this.listOfCountries',this.listOfCountries);
    
  }

  async filterListCars(filterEvent: string): Promise<void> {
    // this.listOfCars = await this.carService.filterCars(filterEvent)
  }

}
