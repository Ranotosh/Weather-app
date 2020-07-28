import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherComponent} from './weather/weather.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const approute: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent },
  { path: '**', component: PageNotFoundComponent }

]

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(approute),
  ],
  declarations: [
    WeatherComponent,
    PageNotFoundComponent
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
