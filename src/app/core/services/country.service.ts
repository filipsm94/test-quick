import { Injectable } from '@angular/core';
import { ICarModel } from 'src/app/shared/models/car.model';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { CountryApiService } from './country-api.service';

@Injectable()
export class CountryService {

  constructor(private countryApi: CountryApiService) { }

  async getAllOrderCountries(): Promise<Array<ICountryModel>> {
    return await this.countryApi.getAllCountries()
  }

  findTimeZoneByCode(code: string, listCountries: Array<ICountryModel>): string {
    console.log('code',code);
    
    const timezone =  listCountries.find((country) => country.code === code)?.timezone
    console.log('timezone',timezone);
    
    return timezone ?? ''
  }

}
