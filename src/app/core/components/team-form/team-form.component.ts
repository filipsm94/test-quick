import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { ITeamModel } from 'src/app/shared/models/state.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { DialogAmountComponent } from '../dialog-amount/dialog-amount.component';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.sass']
})
export class TeamFormComponent implements OnInit {
  @Output() valueFilterEvent = new EventEmitter<string>();
  @Input() countriesList: Array<ICountryModel>

  public teamForm: FormGroup;
  public hasError = false;
  public countriesTeamSelected: Array<ITeamModel> = []
  public filterCountriesList: Array<ICountryModel> = []

  constructor(public dialog: MatDialog, private storageService: StorageService) {
    this.countriesList = []
    this.teamForm = new FormGroup({
      locationNameTeam: new FormControl(null, [Validators.required,]),
    });
  }

  get locationNameTeam(): any { return this.teamForm.get('locationNameTeam'); }

  ngOnInit(): void {
    this.updateFilterCountries()
  }

  updateFormInfo(){
    this.updateFilterCountries()
    this.updateStateTeams()
  }

  updateFilterCountries() {
    this.filterCountriesList = this.reduceLocationTeams()
  }

  updateStateTeams() {
    this.storageService.updateTeam([...this.countriesTeamSelected])
  }

  openDialog(): void {
    const locationValue = this.locationNameTeam.value;

    const dialogRef = this.dialog.open(DialogAmountComponent, {
      width: '250px',
      data: { location: locationValue, amount: 1 },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        if (this.isMaxAmountOfMembers(result)) {
          this.countriesTeamSelected.push({
            location: locationValue,
            amount: result
          })
          this.updateFormInfo()
        }
        else {
          alert('Superó el maximo de miembros permitidos: 10')
        }
      this.teamForm.reset()
    });
  }

  reduceLocationTeams(): Array<ICountryModel> {
    const listCodesSelected = this.countriesTeamSelected.map(({ location: { code } }) => code)
    return this.countriesList.filter(({ code }) => !listCodesSelected.includes(code))
  }

  isMaxAmountOfMembers(initialCount = 0): boolean {
    return this.countriesTeamSelected.map(({ amount }) => amount).reduce((prv, curent) => prv + curent, initialCount) <= 10
  }

  deleteMembers(deleteMember: ITeamModel) {
    this.countriesTeamSelected.length === 1 ?
      this.countriesTeamSelected = []
      :
      this.countriesTeamSelected = this.countriesTeamSelected.filter((team) => team.location.code !== deleteMember.location.code);

    this.updateFormInfo()
  }

}
