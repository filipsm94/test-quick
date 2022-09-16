import { Injectable } from '@angular/core';
import { Times } from 'src/app/shared/constans/state.constant';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { CountryApiService } from './country-api.service';

@Injectable()
export class CountryService {

  constructor(private countryApi: CountryApiService) { }

  async getAllOrderCountries(): Promise<Array<ICountryModel>> {
    return await this.countryApi.getAllCountries()
  }

  findTimeZoneByCode(code: string, listCountries: Array<ICountryModel>): string {
    const timezone = listCountries.find((country) => country.code === code)?.timezone
    return timezone ?? ''
  }

  async isHolidayByVisibleTime(currentDate: Date, countryCode: string) {
    return await this.countryApi.getAllHolidayByCountry(currentDate.getFullYear(), countryCode)
  }


  getholidaysByTime(holidaysList: Array<any>, avaliableTime: string, currentDate: Date) {
    switch (avaliableTime) {
      case Times.Week:
        return this.findWeekHoliday(holidaysList, currentDate)
        break;
      case Times.Month:
        return this.findMonthHoliday(holidaysList, currentDate)
        break;
      default:
        return this.findWeekHoliday(holidaysList, currentDate)
        break;
    }

  }

  findMonthHoliday(holidaysList: Array<any>, currentDate: Date) {
    const findHolidayThisMonth = this.getMonthHolidays(holidaysList,currentDate)
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const finishDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    return this.getWorkingDaysWithoutHolidays(startDate, finishDate, findHolidayThisMonth)
  }

  getMonthHolidays(holidaysList: Array<any>, currentDate: Date) {
    const holidayOfMonth=  holidaysList.filter(({ date }: any) => {
      const segmentedDate = date.split('-')
      const holidaysDate = new Date(Number(segmentedDate[0]), Number(segmentedDate[1]) - 1, Number(segmentedDate[2]))
      if (
        holidaysDate.getFullYear() == currentDate.getFullYear() &&
        holidaysDate.getMonth() == currentDate.getMonth()
      )
        return date
    })
    return holidayOfMonth.map(({ date }) => Number(date.split('-')[2]))
  }

  getWorkingDaysWithoutHolidays(startDate: Date, endDate: Date, hollidays: Array<any>) {
    let result = 0;
    const currentDate = startDate;
    while (currentDate <= endDate) {
      const weekDay = currentDate.getDay();
      if (weekDay != 0 && weekDay != 6)
        if (!hollidays.includes(currentDate.getDate()))
          result++;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return result;
  }

  findWeekHoliday(holidaysList: Array<any>, currentDate: Date) {
    const findHolidayThisWeek = this.getMonthHolidays(holidaysList,currentDate)
    const { startDate, finishDate } = this.getLaboralWeek(currentDate)
    return this.getWorkingDaysWithoutHolidays(startDate, finishDate, findHolidayThisWeek)

  }

  getLaboralWeek(currentDate: Date) {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate() - (currentDate.getDay() - 1)))
    const finishDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate() - (currentDate.getDay() - 5)))
    return { startDate, finishDate }
  }

}
