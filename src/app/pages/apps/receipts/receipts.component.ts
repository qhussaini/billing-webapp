import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { TopBar } from "src/app/layouts/shared/topbar/topbar.model";
import {
  Bill,
  Customer,
  OrderService,
  Product,
  receipt,
} from "../order/order.service";
// import { generatedata } from './../../../sampledata/generatedata';

@Component({
  selector: "app-receipts",
  templateUrl: "./receipts.component.html",
  styleUrls: ["./receipts.component.scss"],
})
export class ReceiptsComponent implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  private gridApi;
  private gridColumnApi;
  private defaultColDef;
  billNo: number = 0;
  pass: string;
  filteredReceipts: receipt[];
  private _searchTerm: string;
  private _dateSearch: string;
  public month = [
    { value: "Janaury" },
    { value: "February" },
    { value: "March" },
    { value: "April" },
    { value: "May" },
    { value: "June" },
    { value: "July" },
    { value: "August" },
    { value: "September" },
    { value: "October" },
    { value: "November" },
    { value: "December" },
  ];
  showCustomer: boolean = false;
  afCusData: Customer[];
  totalbill: number = 0;
  afCoupon: any;
  columnsAfCus: any[];

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredReceipts = this.filterReceipts(value);
  }

  get dateSearch(): string {
    return this._dateSearch;
  }
  set dateSearch(value) {
    this._dateSearch = value;
    this.filteredReceipts = this.filterMonth(value);
  }

  filterMonth(month: string) {
    return this.orderService.receiptsData.filter(
      (receipt) =>
        receipt.month.toLowerCase().indexOf(month.toLowerCase()) !== -1
    );
  }

  filterReceipts(searchString: string) {
    return this.orderService.receiptsData.filter(
      (receipt) =>
        receipt.customer.toLowerCase().indexOf(searchString.toLowerCase()) !==
        -1
    );
  }
  // data: OrderService = new OrderService();
  constructor(
    public topBar: TopBar,
    public orderService: OrderService,
    private dialog: NgbModal,
    private toastr: ToastrService
  ) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
  }
  afRowData: Bill[];
  columnsAf = [];
  totalPrice: number = 0;
  ngOnInit() {
    this.orderService.receiptsData.forEach((data) => {
      this.totalPrice = this.totalPrice + data.amount;
    });
    this.filteredReceipts = this.orderService.receiptsData;
  }

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return "90%";
    }

    return 850;
  }
  deleteBill(content) {
    this.dialog
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.pass = `${result}`;
          if (this.pass == "1234") {
            this.orderService.receiptsData = [];
            this.totalPrice = 0;
            this.filteredReceipts = [];
            this.showInfo("Bill is clear");
          } else {
            this.showError("your not allowed to delete recode");
          }
        },
        (reason) => {
          this.pass = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    // console.log(" pass : " + this.pass);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  dataAdapter = new jqx.dataAdapter({
    localData: this.orderService.receiptsData,
  });

  showError(error: string) {
    this.toastr.error(error, "Error", {
      timeOut: 2800,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true,
      closeButton: true,
    });
  }

  showAlert(error: string) {
    this.toastr.error(error, "Alert", {
      timeOut: 2800,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true,
      closeButton: true,
    });
  }

  showToastr(massage: string) {
    this.toastr.success(massage, "Added", {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true,
      closeButton: true,
    });
  }
  showInfo(massage: string) {
    this.toastr.info(massage, "Info", {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true,
      closeButton: true,
    });
  }

  onRowClicked(event) {
    // console.log(event.data.billDetail);
    if (event.data.coupon !== "not Apply") {
      this.afCoupon = event.data.amount;
    } else {
      this.afCoupon = 0;
    }
    console.table(event.data.customerDetail);
    this.afCusData = [];
    this.afCusData.push(event.data.customerDetail);
    this.afRowData = event.data.billDetail;
    // console.log(this.afRowData);
    this.totalbill = 0;
    if (this.afRowData.length !== 0) {
      this.afRowData.forEach((data) => {
        this.totalbill = this.totalbill + data.qty * data.Iprice;
      });
    }
    // console.log(this.totalbill);
    this.billNo = event.data.billno;
  }

  getTodayDate() {
    let today = new Date();
    let date =
      today.getDate() +
      "/ " +
      `${today.getMonth() + 1}` +
      "/ " +
      today.getFullYear();
    this.orderService.receiptsData.forEach((todayReceipt) => {
      if (date == todayReceipt.date) {
        this.filteredReceipts = [
          {
            billno: todayReceipt.billno,
            date: todayReceipt.date,
            time: todayReceipt.time,
            month: todayReceipt.month,
            amount: todayReceipt.amount,
            payed: todayReceipt.payed,
            nettotal: todayReceipt.nettotal,
            coupon: todayReceipt.coupon,
            tax: todayReceipt.tax,
            paymentType: todayReceipt.paymentType,
            transactionId: todayReceipt.transactionId,
            payment: todayReceipt.payment,
            customer: todayReceipt.customer,
            status: todayReceipt.status,
            employeeID: todayReceipt.employeeID,
            billDetail: todayReceipt.billDetail,
          },
        ];
      }
    });
  }
  getAll() {
    this.filteredReceipts = this.orderService.receiptsData;
  }

  onRowSelect(event) {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    var maxToShow = 5;
    selectedRows.forEach(function (selectedRow, index) {
      if (index >= maxToShow) {
        return;
      }
      if (index > 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.athlete;
    });
    if (selectedRows.length > maxToShow) {
      var othersCount = selectedRows.length - maxToShow;
      selectedRowsString +=
        " and " + othersCount + " other" + (othersCount !== 1 ? "s" : "");
    }
    // document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  columnsAg: any[] = [
    { field: "billno", sortable: true, filter: true, width: 90 },
    {
      field: "customer",
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
    },
    { field: "payment", width: 90, sortable: true, filter: true },
    { field: "transactionId", width: 90, sortable: true, filter: true },
    {
      field: "date",
      width: 90,
      minWidth: 50,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    { field: "time", width: 80, sortable: true, filter: true },
    { field: "paymentType", width: 80, sortable: true, filter: true },
    { field: "amount", width: 80, sortable: true },
    { field: "tax", width: 80 },
    { field: "nettotal", width: 90, sortable: true },
    { field: "status", width: 90, sortable: true, filter: true },
    { field: "coupon", width: 90 },
    { field: "employeeID", width: 90, sortable: true, filter: true },
  ];
  columns: any[] = [
    { text: "Bill No.", datafield: "billno", width: 130 },
    { text: "Date", datafield: "date", width: 130, cellsformat: "yyyy-MM-dd" },
    { text: "Bill Time", datafield: "time", width: 130, cellsformat: "c2" },
    { text: "Amount", datafield: "amount", width: 130, cellsformat: "c2" },
    { text: "Net Total", datafield: "nettotal", width: 130, cellsformat: "c2" },
    { text: "Discount", datafield: "discount", width: 130, cellsformat: "p" },
    {
      text: "Tax",
      datafield: "tax",
      width: 130,
      cellsformat: "c2",
      cellstype: "n",
    },
    { text: "Order Type", datafield: "orderType", width: 130 },
    {
      text: "Payment",
      datafield: "payment",
      width: 120,
      align: "right",
      cellsalign: "right",
      cellsformat: "d",
    },
    {
      text: "Customer",
      datafield: "customer",
      width: 120,
      align: "right",
      cellsalign: "right",
      cellsformat: "d",
    },
    {
      text: "Status",
      datafield: "status",
      width: 100,
      align: "right",
      cellsalign: "right",
    },
    {
      text: "Employee ID",
      datafield: "employeeID",
      cellsalign: "right",
      align: "right",
      cellsformat: "d",
    },
  ];
  excelBtnOnClick() {
    this.myGrid.exportdata("xls", "jqxGrid");
  }
  xmlBtnOnClick() {
    this.myGrid.exportdata("xml", "jqxGrid");
  }
  csvBtnOnClick() {
    this.myGrid.exportdata("csv", "jqxGrid");
  }
  tsvBtnOnClick() {
    this.myGrid.exportdata("tsv", "jqxGrid");
  }
  htmlBtnOnClick() {
    this.myGrid.exportdata("html", "jqxGrid");
  }
  jsonBtnOnClick() {
    this.myGrid.exportdata("json", "jqxGrid");
  }
  pdfBtnOnClick() {
    this.myGrid.exportdata("pdf", "jqxGrid");
  }
}
