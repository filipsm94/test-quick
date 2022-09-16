import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { ITeamModel } from 'src/app/shared/models/state.model';
import { CountryService } from '../../services/country.service';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  public selectedItem: string = '';
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map((result: BreakpointState) => result.matches));


  listOfCountries: Array<ICountryModel> = []
  lookAtTime = 'week'
  selectedTeam: Array<ITeamModel> = []
  open = true


  constructor(
    private countryService: CountryService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.FillCountries()
  }

  async FillCountries(): Promise<void> {
    this.listOfCountries = await this.countryService.getAllOrderCountries()
  }

  closeSideNav() {
    if (this.drawer._mode=='over') {
      this.drawer.close();
    }
  }

}
