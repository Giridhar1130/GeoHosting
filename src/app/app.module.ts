import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IntakeComponent } from './component/intake/intake.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSortModule} from '@angular/material/sort';
import {IntakeFormComponent } from './component/intake-form/intake-form.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule, MatCheckbox, MatButton, MatRippleModule, MatDialog, MatDialogModule, MatTooltipModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule} from '@angular/material';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {CountryGeoClearanceComponent} from './component/country-geo-clearance/country-geo-clearance.component';
import { CelaFeedbackComponent } from './component/cela/cela-feedback-dialog/cela-feedback-dialog.component';
import { GapFeedbackComponent } from './component/gapfeedbackfiles/gapfeedback/gapfeedback.component';
import { RiskManagementFeedbackDialogComponent } from './component/gapfeedbackfiles/gapfeedback/gap-feedback-dialogs/risk-management-feedback-dialog/risk-management-feedback-dialog.component';
import { GeoPhysicalSecurityFeedbackComponent } from './component/gapfeedbackfiles/gapfeedback/gap-feedback-dialogs/geo-physical-security-feedback/geo-physical-security-feedback.component';
import { FeedbackFormDialogComponent } from './component/gapfeedbackfiles/gapfeedback/gap-feedback-dialogs/feedback-form-dialog/feedback-form-dialog.component';
import { CelaFeedbackDialogComponent } from './component/gapfeedbackfiles/gapfeedback/gap-feedback-dialogs/cela-feedback-dialog/cela-feedback-dialog.component';
import { TaxFeedbackDialogComponent } from './component/gapfeedbackfiles/gapfeedback/gap-feedback-dialogs/tax-feedback-dialog/tax-feedback-dialog.component';
import { GeoMatTextareaComponent } from './component/shared/geo-items/geo-mat-textarea/geo-mat-textarea.component';
import { GeoMatInputComponent } from './component/shared/geo-items/geo-mat-input/geo-mat-input.component';
import { GeoMatDropdownComponent } from './component/shared/geo-items/geo-mat-dropdown/geo-mat-dropdown.component';
import { GeoActionComponent } from './component/shared/geo-items/geo-action/geo-action.component';
import { GeoMatDatepickerComponent } from './component/shared/geo-items/geo-mat-datepicker/geo-mat-datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    IntakeComponent,
    IntakeFormComponent,
    HomeComponent,
    CountryGeoClearanceComponent,
    CelaFeedbackComponent,
    MatCheckbox,
    GapFeedbackComponent,
    RiskManagementFeedbackDialogComponent,
    GeoPhysicalSecurityFeedbackComponent,
    TaxFeedbackDialogComponent,
    FeedbackFormDialogComponent,
    CelaFeedbackDialogComponent,
    GeoMatTextareaComponent,
    GeoMatInputComponent,
    GeoMatDropdownComponent,
    GeoActionComponent,
    GeoMatDatepickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSortModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatRadioModule,
    MatCardModule,
    MatRippleModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  entryComponents: [
    CelaFeedbackComponent,
    RiskManagementFeedbackDialogComponent,
    GeoPhysicalSecurityFeedbackComponent,
    FeedbackFormDialogComponent,
    CelaFeedbackDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
