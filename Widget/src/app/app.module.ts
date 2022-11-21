import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TransactionGridComponent } from './components/transaction-grid/transaction-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrModule } from 'angularx-flatpickr';


//
// Form Controls
//

import { FormsModule } from '@angular/forms';
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
import { TransactionFormComponent } from './components/transaction-form-component/transaction-form.component';
import { TabStripComponent } from './components/tab-strip/tab-strip.component';
import { SummaryGridComponent } from './components/summary-grid/summary-grid.component';
import { LicenseManager } from 'ag-grid-enterprise';
import { DateEditorComponent } from './components/transaction-grid/date-editor/date-editor.component';
import { CheckmarkHeaderComponent } from './components/summary-grid/checkmark-header/checkmark-header.component';

LicenseManager.setLicenseKey("CompanyName=US Coast Guard Community Services Command,LicensedGroup=USCG,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=4,LicensedProductionInstancesCount=4,AssetReference=AG-024704,ExpiryDate=9_March_2023_[v2]_MTY3ODMyMDAwMDAwMA==881f6cf7765ec059341605719962a8a6")


@NgModule({
  declarations: [
    AppComponent,
    TransactionGridComponent,
    CsvUpdateUploaderComponent,
    TransactionFormComponent,
    TabStripComponent,
    SummaryGridComponent,
    DateEditorComponent,
    CheckmarkHeaderComponent,
  ],
  imports: [
    AgGridModule,
    FlatpickrModule.forRoot(),
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
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
