import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICountryModel } from 'src/app/shared/models/country.model';

@Injectable()
export class CountryApiService {

  private _dataUrl = 'assets/countries.json'

  constructor(private http: HttpClient) { }

  getAllCountries(): Promise<Array<ICountryModel>> {
    return firstValueFrom(
      this.http.get<Array<ICountryModel>>(`${this._dataUrl}`).pipe(map((response: any) => response.countries))
    );
  }

  getAllHolidayByCountry(year: number, countryCode: string) {
    return firstValueFrom(
      this.http.get<Array<any>>(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`).pipe(map((response: any) => response))
    );
  }
}
