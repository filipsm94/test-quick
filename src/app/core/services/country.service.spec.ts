import { TestBed } from '@angular/core/testing';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { CountryApiService } from './country-api.service';
import { CountryApiServiceStub } from './country-api.service.stub';

import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let countryApiService: CountryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryService);

    TestBed.configureTestingModule({
      providers: [
        CountryService,
        { provide: CountryApiService, useClass: CountryApiServiceStub },
      ],
    });
    service = TestBed.inject(CountryService);
    countryApiService = TestBed.inject(CountryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return list of countrys', async () => {
    const mockCountrys: Array<ICountryModel> = [
      {
        "name": "Andorra",
        "code": "AD",
        "timezone": "UTC +02:00"
      },
      {
        "name": "Albania",
        "code": "AL",
        "timezone": "UTC +02:00"
      },
      {
        "name": "Argentina",
        "code": "AR",
        "timezone": "UTC -3:00:00"
      },
    ];

    spyOn(countryApiService, 'getAllCountries').and.returnValue(Promise.resolve(mockCountrys));

    const result = await service.getAllOrderCountries();

    expect(result).toEqual(mockCountrys);

  });
});
