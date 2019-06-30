import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntakeComponent } from './component/intake/intake.component';
import { IntakeFormComponent } from './component/intake-form/intake-form.component';
import { HomeComponent } from './component/home/home.component';
import { CountryGeoClearanceComponent } from './component/country-geo-clearance/country-geo-clearance.component';
import { GapFeedbackComponent } from './component/gapfeedbackfiles/gapfeedback/gapfeedback.component';
import { CelaFeedbackComponent } from './component/cela/cela-feedback-dialog/cela-feedback-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'intake', component: IntakeComponent },
  { path: 'intakeform', component: IntakeFormComponent},
  { path: 'geoclearance/:selectedCountry', component: CountryGeoClearanceComponent},
  { path: 'gapfeedback', component: GapFeedbackComponent},
  { path: 'celafeedback', component: CelaFeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
