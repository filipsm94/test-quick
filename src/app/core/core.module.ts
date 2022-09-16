import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OpaqueTextPipe } from '../shared/pipes/opaque-text.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DialogAmountComponent } from './components/dialog-amount/dialog-amount.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { InfoTimeTeamComponent } from './components/info-time-team/info-time-team/info-time-team.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { CoreRoutingModule } from './core-routing.module';
import { CountryApiService } from './services/country-api.service';
import { CountryService } from './services/country.service';

@NgModule({
  declarations: [
    DashboardComponent,
    OpaqueTextPipe,
    FilterFormComponent,
    TeamFormComponent,
    DialogAmountComponent,
    InfoTimeTeamComponent
  ],
  imports: [
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [
    OpaqueTextPipe,
    CountryApiService,
    CountryService
  ]
})
export class CoreModule { }
