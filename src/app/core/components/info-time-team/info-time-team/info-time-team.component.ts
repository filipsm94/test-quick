import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from 'src/app/core/services/country.service';
import { Times } from 'src/app/shared/constans/state.constant';
import { ITeamModel } from 'src/app/shared/models/state.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';



@Component({
  selector: 'app-info-time-team',
  templateUrl: './info-time-team.component.html',
  styleUrls: ['./info-time-team.component.sass'],
})
export class InfoTimeTeamComponent implements OnInit {
  // @Input() selectedTeam: Array<ITeamModel>
  lookAtTime = Times.Week
  selectedDay = new Date()
  selectedTeam: Array<ITeamModel> = []

  showListCapacity: any = []
  leadInfo: any = {
    title: 'Total Equipo',
    amount: 0,
    days: 0,
    hours: 0
  }


  constructor(private storageService: StorageService,
    private countryService: CountryService) {
    // this.selectedTeam = []
  }

  ngOnInit(): void {
    this.getSelectedTeam()
  }

  async getSelectedTeam() {
    this.storageService.getTeam().subscribe({
      next: (v) => {
        this.selectedTeam = [...v]
        this.fillCapacity()
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })

  }

  async fillCapacity() {
    this.showListCapacity = []
    this.leadInfo = {
      ...{
        title: 'Total Equipo',
        amount: 0,
        days: 0,
        hours: 0
      }
    }
    const auxiliar: any = []
    this.selectedTeam.forEach(async (team) => {
      const varlorrr = await this.getCapacityByCountry(team).then((response) => {
        return {
          title: team.location.name,
          timezone: team.location.timezone,
          amount: team.amount,
          days: response.avaliableDays,
          hours: response.getHours
        }
      })
      auxiliar.push(varlorrr)
    })

    setTimeout(() => {
      this.showListCapacity = [...auxiliar]
      this.showListCapacity.forEach((cap: any) => {
        console.log('countryes', cap);

        this.leadInfo = {
          ...this.leadInfo,
          amount: this.leadInfo.amount + cap.amount,
          hours: this.leadInfo.hours + cap.hours,
        }
      })
    }, 500)


  }

  async getCapacityByCountry(team: ITeamModel) {
    const list = await this.countryService.isHolidayByVisibleTime(this.selectedDay, team.location.code)
    const avaliableDays = this.countryService.getholidaysByTime(list, this.lookAtTime, this.selectedDay)
    const getHours = this.getHoursByDaysAndAmount(avaliableDays, team)
    return { avaliableDays, getHours }
  }

  getHoursByDaysAndAmount(avaliableDays: number, { amount }: ITeamModel) {
    const HoursPerMember = 8
    return HoursPerMember * avaliableDays * amount
  }

  getCurrentlyTime() {
    const { startDate, finishDate } = this.countryService.getLaboralWeek(this.selectedDay)
    let nameMonth = this.selectedDay.toLocaleString('default', { month: 'long' });
    if (startDate.getMonth() != finishDate.getMonth()) {
      nameMonth = `${startDate.toLocaleString('default', { month: 'long' })}_${finishDate.toLocaleString('default', { month: 'long' })}`
    }

    return this.lookAtTime == Times.Week ? `${this.selectedDay.getFullYear()} | ${nameMonth.toUpperCase()} ${startDate.getDate()}-${finishDate.getDate()}` : `${this.selectedDay.getFullYear()} | ${nameMonth.toUpperCase()}`
  }

  ForwardTime() {
    this.selectedDay = this.getToogleWeeksDate(true)
    this.fillCapacity()
  }

  BackTime() {
    this.selectedDay = this.getToogleWeeksDate(false)
    this.fillCapacity()
  }

  getToogleWeeksDate(next: boolean) {
    const now = new Date(this.selectedDay);
    if (this.lookAtTime == Times.Week) {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - (next ? -7 : 7));
    } else {
      return new Date(now.getFullYear(), now.getMonth() - (next ? -1 : 1), now.getDate());
    }
  }

  changeTime(event: any) {
    this.fillCapacity()
  }



}
