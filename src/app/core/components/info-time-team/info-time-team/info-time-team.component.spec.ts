import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTimeTeamComponent } from './info-time-team.component';

describe('InfoTimeTeamComponent', () => {
  let component: InfoTimeTeamComponent;
  let fixture: ComponentFixture<InfoTimeTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTimeTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTimeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
