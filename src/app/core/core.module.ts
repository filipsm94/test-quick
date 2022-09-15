import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OpaqueTextPipe } from '../shared/pipes/opaque-text.pipe';
import { CardCarComponent } from './components/card-car/card-car.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { CoreRoutingModule } from './core-routing.module';
import { CountryApiService } from './services/country-api.service';
import { CountryService } from './services/country.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAmountComponent } from './components/dialog-amount/dialog-amount.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    DashboardComponent,
    OpaqueTextPipe,
    CardCarComponent,
    FilterFormComponent,
    TeamFormComponent,
    DialogAmountComponent
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
    MatListModule
  ],
  providers: [
    OpaqueTextPipe,
    CountryApiService,
    CountryService
  ]
})
export class CoreModule { }
