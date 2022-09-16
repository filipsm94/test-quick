import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { ILeadModel, ITeamModel } from 'src/app/shared/models/state.model';
import { CountryService } from '../../services/country.service';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { empytLead } from 'src/app/shared/constans/state.constant';

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
  validSelectedLead = false
  selectedLead: ILeadModel


  constructor(
    private countryService: CountryService,
    private breakpointObserver: BreakpointObserver,
    private storageService: StorageService
  ) {
    this.selectedLead = empytLead
  }

  ngOnInit(): void {
    this.FillCountries()
    this.getLead()
  }

  async FillCountries(): Promise<void> {
    this.listOfCountries = await this.countryService.getAllOrderCountries()
  }

  getLead() {
    this.storageService.getLead().subscribe({
      next: (lead) => {
        console.log('int');
        this.selectedLead = lead
        this.validSelectedLead = this.validLead(lead)
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  validLead({ name, location }: ILeadModel): boolean {
    return name !='' && location && location.name != ''
  }

  closeSideNav() {
    if (this.drawer._mode == 'over') {
      this.drawer.close();
    }
  }

}
