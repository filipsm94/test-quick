import { Component, OnInit } from '@angular/core';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { ITeamModel } from 'src/app/shared/models/state.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  listOfCountries: Array<ICountryModel> = []
  lookAtTime = 'week'
  selectedTeam: Array<ITeamModel> = []

  constructor(
    private countryService: CountryService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.FillCars()
    // this.getSelectedTeam()
  }

  async FillCars(): Promise<void> {
    this.listOfCountries = await this.countryService.getAllOrderCountries()
    // console.log('this.listOfCountries',this.listOfCountries);
    
  }

  // async getSelectedTeam() {
  //   this.storageService.getTeam().subscribe({
  //     next: (v) => {
  //       console.log('out');
        
  //       this.selectedTeam = [...v]
  //     },
  //     error: (e) => console.error(e),
  //     complete: () => console.info('complete')
  //   })

  // }

  async filterListCars(filterEvent: string): Promise<void> {
    // this.listOfCars = await this.carService.filterCars(filterEvent)
  }

}
