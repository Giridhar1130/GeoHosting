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
import { MatInputModule, MatCheckbox, MatButton, MatRippleModule, MatDialog, MatDialogModule} from '@angular/material';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {CountryGeoClearanceComponent} from './component/country-geo-clearance/country-geo-clearance.component';
import { CelaFeedbackComponent } from './component/cela/cela-feedback-dialog/cela-feedback-dialog.component';
import { GeoInputComponent } from './component/geo-items/geo-input/geo-input.component';
import { GeoTextareaComponent } from './component/geo-items/geo-textarea/geo-textarea.component';
import { DropdownComponent } from './component/geo-items/geo-dropdown/geo-dropdown.component';
import { GeoMatDropdownComponent } from './component/geo-items/geo-mat-dropdown/geo-mat-dropdown.component';
import { GeoActionComponent } from './component/geo-items/geo-action/geo-action.component';
import { GeoMatInputComponent } from './component/geo-items/geo-mat-input/geo-mat-input.component';
import { GapFeedbackComponent } from './component/gapfeedbackfiles/gapfeedback/gapfeedback.component';

@NgModule({
  declarations: [
    AppComponent,
    IntakeComponent,
    IntakeFormComponent,
    HomeComponent,
    CountryGeoClearanceComponent,
    CelaFeedbackComponent,
    GeoInputComponent,
    GeoTextareaComponent,
    DropdownComponent,
    GeoMatDropdownComponent,
    MatCheckbox,
    MatButton,
    GeoActionComponent,
    GeoMatInputComponent,
    GapFeedbackComponent
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
    MatDialogModule
  ],
  entryComponents: [
    CelaFeedbackComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
