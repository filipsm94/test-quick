import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CountryApiService } from './country-api.service';
import { ICountryModel } from 'src/app/shared/models/country.model';
import { empytCountry } from 'src/app/shared/constans/country.constant';

describe('CountryApiService', () => {
  let service: CountryApiService;
  let httpMock: HttpTestingController;
  const responseMock = {
    data: {

    },
    notification: {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CountryApiService,
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CountryApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be getAllProductsToUser successful', () => {
    const mockUser: ICountryModel = {
      ...empytCountry,
      name:'Colombia'
    };

    service.getAllCountries(
      ).then((response) => {
        expect(response).toBeDefined();
    });
    const request = httpMock.expectOne(`assets/countrys.json`);
    expect(request.request.method).toBe('GET'); ``;
    request.flush(responseMock);
  });
});
