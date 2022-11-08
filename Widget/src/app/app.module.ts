import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ManageGridComponent } from './components/manage-grid/manage-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//
// Form Controls
//

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

//
// Navigation
//

import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

//
// Layout
//

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

//
// Buttons & Indicators
//

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//
// Popups & Modals
//

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

//
// Data Table
//

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CsvUpdateUploaderComponent } from './components/csv-update-uploader/csv-update-uploader.component';
import { AccountFormComponent } from './components/transaction-form-component/transaction-form.component';



@NgModule({
  declarations: [
    AppComponent,
    ManageGridComponent,
    CsvUpdateUploaderComponent,
    AccountFormComponent,
  ],
  imports: [
    AgGridModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatCardModule,
    MatSliderModule,
    MatGridListModule,
    MatExpansionModule,
    MatStepperModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
