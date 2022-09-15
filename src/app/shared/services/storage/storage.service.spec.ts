import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { addCar } from 'src/app/store/actions/car.actions';
import { QuickState } from 'src/app/store/reducers';
import { getCarSelector } from 'src/app/store/selectors/car/car.selectors';
import { empytCar } from '../../constans/country.constant';
import { ICarModel } from '../../models/car.model';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let store: MockStore<QuickState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
        provideMockStore()
      ]
    });
    service = TestBed.inject(StorageService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call setCarSelected', () => {
    const mockProduct: ICarModel = {
      ...empytCar
    };
    spyOn(store, 'dispatch');
    service.setCarSelected(mockProduct);
    expect(store.dispatch).toHaveBeenCalledWith(
      addCar({ payload: mockProduct })
    );
  });

  it('should be call getCarSelected', async () => {
    const mockProduct: ICarModel = {
      ...empytCar,
      Brand:'bmw'
    };
    store.overrideSelector(getCarSelector, mockProduct);
    const response = await service.getCarSelected();
    expect(response).toEqual(mockProduct);
  });
});
