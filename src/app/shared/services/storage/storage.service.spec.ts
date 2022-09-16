import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { QuickState } from 'src/app/store/reducers';
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
});
