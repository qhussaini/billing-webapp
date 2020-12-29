import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { UIModule } from "../../shared/ui/ui.module";
import { AppsRoutingModule } from "./apps-routing.module";

import { EmailModule } from "./email/email.module";
import { ProjectModule } from "./project/project.module";
import { TasksModule } from "./tasks/tasks.module";
import { FullCalendarModule } from "@fullcalendar/angular";
import { jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { jqxValidatorModule } from "jqwidgets-ng/jqxvalidator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { jqxPopoverModule } from "jqwidgets-ng/jqxpopover";
import { AgGridModule } from "ag-grid-angular";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatDividerModule } from "@angular/material/divider";
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { MatSelectModule } from "@angular/material/select";
import { jqxDropDownListModule } from "jqwidgets-ng/jqxdropdownlist";
import { MatDialogModule } from "@angular/material/dialog";
import { WidgetModule } from "src/app/shared/widgets/widget.module";

import { CalendarComponent } from "./calendar/calendar.component";
import { OrderService } from "./order/order.service";
import { OrderComponent } from "./order/order.component";
import { ReceiptsComponent } from "./receipts/receipts.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { SummaryPipe } from "./summary.pipe";
import { AutofocusDirective } from "./order/autofocus.directive";
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { BarcodescannerComponent } from "./barcodescanner/barcodescanner.component";
import { NgQrScannerModule } from "angular2-qrscanner";

@NgModule({
  declarations: [
    CalendarComponent,
    OrderComponent,
    ReceiptsComponent,
    PurchaseComponent,
    SummaryPipe,
    AutofocusDirective,
    BarcodescannerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    WidgetModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    jqxValidatorModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTooltipModule,
    MatRippleModule,
    MatChipsModule,
    MatDialogModule,
    ClipboardModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    FullCalendarModule,
    AppsRoutingModule,
    jqxPopoverModule,
    UIModule,
    jqxGridModule,
    AgGridModule,
    EmailModule,
    ProjectModule,
    TasksModule,
    NgSelectModule,
    NgxAutoScrollModule,
    MatDividerModule,
    MatSelectModule,
    jqxDropDownListModule,
    BarcodeScannerLivestreamModule,
    NgQrScannerModule,
  ],
  providers: [OrderService],
})
export class AppsModule {}
