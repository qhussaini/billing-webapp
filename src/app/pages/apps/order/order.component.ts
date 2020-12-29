import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
  ElementRef,
} from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { Customer, OrderService, Product } from "./order.service";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from "rxjs/operators";
import { TopBar } from "src/app/layouts/shared/topbar/topbar.model";
import { NgxAutoScroll } from "ngx-auto-scroll";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  host: {
    "(window:keyup)": "keySelecter($event)",
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements AfterViewInit, OnInit {
  tableValue = "";
  itemValue = "";
  inputType = "";
  inputHint = "";
  subItem = "";
  fname = "";
  lname = "";
  cMobile = "";
  cEmail = "";
  iCode = "";
  iName = "";
  gName = "";
  iVendor = "";
  pPrice: number;
  iUnit: number;
  sPrice: number;
  iShelf: number;
  totalPrice: number = 0;
  showCmt = "Search Product";
  showCustomer = false;
  subMenu: true;
  getUser = [];
  makeBill = this.orderService.bill;
  holdIcon = "pan_tool";
  holdName = "Hold Bill";
  pass = "";
  customerBill: string;
  checked = false;
  cashPay: number = 0;
  top: number = 10;
  left: number = -50;
  gpay: boolean = false;

  form = new FormGroup({
    tables: new FormArray([]),
  });
  addproduct = [];
  searchControl = new FormControl();
  filterSearch: Observable<Product[]>;
  filterCustomer: Observable<Customer[]>;
  optCustomer = this.orderService.customerData;
  options = this.orderService.products;
  billNum: number;
  billSet: boolean = false;
  netAmount: number;
  showClock: boolean;
  beforRedeem: number;
  coupon: string;
  couponRedeem: boolean = false;
  couponName: string;
  empId: number;
  // customerForm = new FormGroup ({
  //   customerData: new FormArray([])
  // });

  @ViewChild("grid", { static: false }) grid: jqxGridComponent;
  upiTid: number;
  customerDetial: Customer[];

  searchProductFn(subject) {
    if (!this.showCustomer) {
      return subject ? subject.IName : undefined;
    } else {
      return subject ? subject.fname : undefined;
    }
  }

  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;
  @ViewChild("customerInput") customerInput: ElementRef;
  @ViewChild("sCustomer") sCustomer: ElementRef;

  public forceScrollDown(): void {
    this.ngxAutoScroll.forceScrollDown();
  }

  constructor(
    private dialog: NgbModal,
    private mDialog: MatDialog,
    private toastr: ToastrService,
    public orderService: OrderService,
    public topBar: TopBar,
    private authUser: AuthenticationService,
    private el: ElementRef
  ) {
    this.topBar.checkSize();
    this.empId = this.authUser.currentUser().empId;
    this.filterSearch = this.searchControl.valueChanges.pipe(
      startWith(""),
      map((IName) =>
        IName ? this._filter(IName) : this.orderService.products.slice()
      )
    );
    this.filterCustomer = this.searchControl.valueChanges.pipe(
      startWith(""),
      map((IName) =>
        IName
          ? this._filterCustomer(IName)
          : this.orderService.customerData.slice()
      )
    );
    console.log(this.customerBill);
    if (topBar.screenWidth >= 988) {
      this.showClock = true;
    } else {
      this.showClock = false;
    }
  }
  ngAfterViewInit() {}
  // getBillSet() {
  //   if (this.orderService.bill.length === 0) {
  //     this.billSet = false;
  //   } else {
  //     this.billSet = true;
  //   }
  // }

  keySelecter(event) {
    console.log(event.keyCode);
    if (event.altKey && event.keyCode == 67) {
      this.changeViewCus();
      this.customerInput.nativeElement.focus();
    } else if (event.ctrlKey && event.keyCode == 191) {
      document.getElementById("customerInput").focus();
    } else if (event.altKey && event.keyCode == 74) {
      document.getElementById("holdB").click();
    } else if (event.altKey && event.keyCode == 82) {
      document.getElementById("scannerB").click();
    } else if (event.altKey && event.keyCode == 87) {
      document.getElementById("deleteB").click();
    } else if (event.altKey && event.keyCode == 89) {
      document.getElementById("coupon").click();
    } else if (event.keyCode == 113) {
      document.getElementById("cashB").click();
    } else if (event.keyCode == 119) {
      document.getElementById("cCardB").click();
    } else if (event.keyCode == 120) {
      document.getElementById("paymentB").click();
    } else if (event.altKey && event.keyCode == 85) {
      document.getElementById("upiB").click();
    } else if (event.keyCode == 115) {
      document.getElementById("cardB").click();
    } else if (event.altKey && event.keyCode == 80) {
      document.getElementById("payPalB").click();
    }
  }

  ngOnInit() {}
  private _filter(IName: string): Product[] {
    const filterValue = IName.toLowerCase();

    return this.orderService.products.filter(
      (option) => option.IName.toLowerCase().indexOf(filterValue) === 0
    );
  }
  private _filterCustomer(IName: string): Customer[] {
    const filterValue = IName.toLowerCase();

    return this.orderService.customerData.filter(
      (option) => option.fname.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // private _filter(value: string): string[]{
  //   const searchValue = value.toLowerCase();
  //   return this.options.filter(option => option.IName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
  // }

  public model: any;

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : this.orderService.customerData.filter(v => v.fname.indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )

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

  refreshPage() {
    window.location.reload();
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
  addTable(table: HTMLInputElement) {
    if (!table.value) {
      this.showError("Table Field is empty");
    } else {
      this.tables.push(new FormControl(table.value));
      table.value = "";
      this.showToastr("product added successfully");
    }
  }

  addNew(
    fName: HTMLInputElement,
    lName: HTMLInputElement,
    mobile: HTMLInputElement,
    email: HTMLInputElement
  ) {
    if (!fName.value && !lName.value && !mobile.value && !email.value) {
      this.showError("Table Field is empty");
    } else {
      this.orderService.customerData.push({
        srno: 1,
        fname: fName.value,
        lname: lName.value,
        mobile: mobile.value,
        email: email.value,
      });
      fName.value = "";
      lName.value = "";
      mobile.value = "";
      email.value = "";
      this.showToastr("product added successfully");
      this.orderService.testVal = this.orderService.customerData;
    }
  }
  getBillNo() {
    // if (this.makeBill != []) {
    let bnum = this.orderService.receiptsData.length;
    this.billNum =
      bnum !== 0 ? this.orderService.receiptsData[bnum - 1].billno + 1 : 5001;
    console.log(bnum);
    // }
  }
  getValue(customer) {
    this.fname = customer.fname;
    this.lname = customer.lname;
    this.cMobile = customer.mobile;
    this.cEmail = customer.email;
  }
  // details= [
  //   {no: '#', product:'', qty:'', price:'', code:''}
  // ]
  dproduct = "";
  dcode = "";
  dqty = "";
  dprice = "";
  getDetails(item) {
    this.dproduct = item.product;
    this.dqty = item.qty;
    this.dprice = item.price;
    this.dcode = item.code;
  }
  changeViewCus() {
    if (this.showCustomer) {
      this.showCustomer = false;
      this.showCmt = "Search Product";
    } else {
      this.showCustomer = true;
      this.showCmt = "Search Customer";
    }
  }

  // tslint:disable-next-line: member-ordering
  billing = [
    { no: "1", product: "book", qty: "1", price: "2.5", code: "bk5" },
    { no: "2", product: "7Up", qty: "2", price: "1.5", code: "7up" },
    { no: "3", product: "peanut butter", qty: "1", price: "3.5", code: "ptb" },
    { no: "4", product: "pen", qty: "1", price: "0.5", code: "ppn" },
    { no: "5", product: "dates", qty: "1", price: "5", code: "dats7" },
  ];

  deleteTable(table: FormControl) {
    let index = this.tables.controls.indexOf(table);
    this.tables.removeAt(index);
  }
  get tables() {
    return this.form.get("tables") as FormArray;
  }

  checkCustomers() {
    if (
      this.customerInput.nativeElement.touched &&
      this.customerBill === undefined
    ) {
      this.orderService.customerDialog = false;
      this.checked = false;
    }
  }
  open(content) {
    this.dialog.open(content, { size: "lg" }).result.then(
      (result) => {
        this.tableValue = `Table: ${result}`;
      },
      (reason) => {
        this.tableValue = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  gpayOpen(content) {
    this.dialog.open(content);
  }
  getCashPay(content) {
    this.dialog.open(content, { size: "xl" });
  }

  paymaent(amountPay: number) {
    if (
      amountPay != 0 &&
      amountPay >= this.netAmount &&
      amountPay !== this.netAmount + 2
    ) {
      this.cashPay = amountPay;
      this.showToastr("Payment is confirm");
      this.dialog.dismissAll();
    } else {
      this.showError("Add payment");
    }
    console.log(amountPay);
  }
  gPayment(content) {
    this.dialog.open(content);
    this.showInfo("Enter UPI Transaction ID");
  }
  getUpiTId(Tid) {
    if (Tid.value) {
      this.upiTid = Tid.value;
      this.gpay = true;
      this.showToastr("UPI Transaction ID is added");
      this.dialog.dismissAll();
    } else {
      this.showError("Enter UPI Transaction ID");
    }
  }

  openItem(content) {
    this.dialog.open(content, { size: "xl" });
  }
  openBill(content) {
    if (this.topBar.selectedView) {
      this.dialog.open(content, { size: "xl" });
    }
  }

  getItemD(product) {
    this.iCode = product.ICode;
    this.iName = product.IName;
    this.gName = product.GName;
    this.iVendor = product.vendor;
    this.pPrice = product.pPrice;
    this.iUnit = product.IUnit;
    this.sPrice = product.sPrice;
    this.iShelf = product.shelf;
  }
  addProduct(option) {
    this.iCode = option.ICode;
    this.iName = option.IName;
    this.gName = option.GName;
    this.iVendor = option.vendor;
    this.pPrice = option.pPrice;
    this.iUnit = option.IUnit;
    this.sPrice = option.sPrice;
    this.iShelf = option.shelf;
  }
  cancelBill(content, item) {
    this.dialog.open(content, { size: "sm" }).result.then(
      (result) => {
        this.tableValue = `${result}`;
      },
      (reason) => {
        this.tableValue = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    console.log(this.tableValue);
    this.deleteAt(item);
  }
  deleteAt(item) {
    if (this.tableValue == "delete") {
      this.billing.splice(item);
    }
  }
  deleteItem(item) {
    let qtyM = this.orderService.bill.indexOf(item);
    this.orderService.products.forEach((value) => {
      if (value.IName === this.orderService.bill[qtyM].Iname) {
        value.IUnit = value.IUnit + this.orderService.bill[qtyM].qty;
      }
    });
    this.orderService.bill.splice(qtyM, 1);
    this.showInfo(item.Iname + " is Deleted");
    this.totalAmount();
  }
  clearBill(content) {
    this.dialog
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.pass = `${result}`;
          if (this.pass == "1234") {
            this.orderService.bill = [];
            this.totalPrice = 0;
            this.checked = false;
            this.customerBill = undefined;
            this.showInfo("Bill is clear");
          } else {
            this.showError("your not allowed to delete recode");
          }
        },
        (reason) => {
          this.pass = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

    console.log(" pass : " + this.pass);
  }

  columns = this.orderService.productDataColumns;

  bColumns = [
    { text: "Id", datafield: "ICode" },
    { text: "Name", datafield: "IName" },
    { text: "Unit", datafield: "IUnit" },
    { text: "Sale Price", datafield: "sPrice" },
  ];

  addbill(option) {
    const prd = option.IName;
    const pri: number = option.sPrice;
    const code = option.ICode;
    const type = option.GName;
    const vendor = option.vendor;
    const shelf: number = option.shelf;
    const qty: number = 1;
    let dup = false;
    // this.getBillSet();
    let qtyM = this.orderService.products.indexOf(option);
    if (this.customerBill === undefined) {
      this.checked = false;
      this.orderService.customerDialog = false;
      this.showCustomer = false;
      this.showCmt = "Search Product";
    }
    if (option.IUnit === 0) {
      this.showError(prd + " is not available");
    } else {
      this.orderService.bill.forEach((value) => {
        if (value.Iname === prd) {
          value.qty++;
          dup = true;
          this.orderService.products[qtyM].IUnit =
            this.orderService.products[qtyM].IUnit - 1;
        }
      });
      if (!dup && this.orderService.bill.length !== 0) {
        this.orderService.bill.push({
          Iname: prd,
          Iprice: pri,
          Icode: code,
          Itype: type,
          vendor: vendor,
          shelf: shelf,
          qty: qty,
        });
        this.orderService.products[qtyM].IUnit =
          this.orderService.products[qtyM].IUnit - 1;
      }
      if (this.orderService.bill.length === 0) {
        this.orderService.bill.push({
          Iname: prd,
          Iprice: pri,
          Icode: code,
          Itype: type,
          vendor: vendor,
          shelf: shelf,
          qty: qty,
        });
        this.orderService.products[qtyM].IUnit =
          this.orderService.products[qtyM].IUnit - 1;
        this.showToastr("Bill added successfully");
        console.log("main adding mothed is called");
        console.log("bill di" + this.orderService.bill.length);
      }
    }
    for (let i = 0; i < this.orderService.products.length; i++) {
      if (this.orderService.products[i].IUnit <= 6) {
        if (this.topBar.alertItem.length === 0) {
          this.showAlert(
            this.orderService.products[i].IName +
              " is runing low in stock : '" +
              this.orderService.products[i].IUnit +
              "'"
          );
        }
        // this.topBar.alertItem = [];
        this.topBar.alertItem.push({
          color: "danger",
          title: "Alert",
          text:
            this.orderService.products[i].IName +
            " is runing low in stock : '" +
            this.orderService.products[i].IUnit +
            "'",
          icon: "error_outline",
        });
        this.topBar.alertCheck(true);
      }
    }
    if (option.IUnit === 0) {
      this.orderService.products[qtyM].active = false;
    }
    this.getBillNo();

    this.totalAmount();
  }
  incrementItem(item) {
    // let qtyM = this.orderService.products.indexOf(item);
    // console.log(this.orderService.products.indexOf(item.IName));
    // this.orderService.products[qtyM].IUnit =
    //   this.orderService.products[qtyM].IUnit - 1;
    let qty = this.orderService.bill.indexOf(item);
    console.log(
      "::increment::" +
        qty +
        ":: data ::" +
        this.orderService.bill.indexOf(item)
    );
    this.orderService.bill[qty].qty = this.orderService.bill[qty].qty + 1;
    this.totalAmount();
  }
  decrementItem(item) {
    // let qtyM = this.orderService.products.indexOf(item);
    // console.log(this.orderService.products.indexOf(item.IName));
    // this.orderService.products[qtyM].IUnit =
    //   this.orderService.products[qtyM].IUnit - 1;
    let qty = this.orderService.bill.indexOf(item);
    console.log(
      "::increment::" +
        qty +
        ":: data ::" +
        this.orderService.bill.indexOf(item)
    );
    if (this.orderService.bill[qty].qty !== 1) {
      this.orderService.bill[qty].qty = this.orderService.bill[qty].qty - 1;
    } else {
      this.showError(
        "if like delete this product click X icon on rightside of product"
      );
    }
    this.totalAmount();
  }

  holdBill() {
    console.log(this.orderService.holdBill == null);
    if (this.orderService.holdBill == null) {
      if (this.orderService.bill.length != 0) {
        this.orderService.holdBill = this.orderService.bill;
        this.orderService.bill = [];
        this.totalAmount();
        this.holdIcon = "sync";
        this.holdName = "Unhold Bill";
        this.showInfo("Bill is on hold");
        this.topBar.alertItem.push({
          color: "primary",
          title: "Alert",
          text: "Bill is on hold",
          icon: "error_outline",
        });
        this.topBar.alertCheck(true);
      } else {
        this.showError("The bill is empty");
      }
    } else if (
      this.orderService.holdBill != null &&
      this.orderService.bill.length === 0
    ) {
      this.orderService.bill = this.orderService.holdBill;
      this.orderService.holdBill = null;
      this.holdIcon = "pan_tool";
      this.holdName = "Hold Bill";
      this.totalAmount();
      this.showInfo("Bill is ready to cash");
    } else {
      this.showError(
        "!*Please cash the available bill and unhlod the previous bill*! \n you can hold only one bill at a time"
      );
    }
  }

  checkCustomer(content) {
    if (!this.checked) {
      if (this.customerBill === undefined) {
        this.dialog.open(content, { size: "lg" }).result.then(
          (result) => {
            this.tableValue = `${result}`;
            if (this.tableValue === "yes") {
              setTimeout(() => {
                this.customerInput.nativeElement.focus();
              }, 100);
              this.orderService.customerDialog = true;
              this.showCustomer = true;
              this.showCmt = "Search Customer";
            } else {
              this.orderService.customerDialog = false;
              this.showCustomer = false;
              this.showCmt = "Search Product";
            }
          },
          (reason) => {
            this.tableValue = `${this.getDismissReason(reason)}`;
            if (
              reason === ModalDismissReasons.ESC ||
              reason === ModalDismissReasons.BACKDROP_CLICK ||
              reason === "Close"
            ) {
              this.checked = false;
            }
          }
        );
      }
    } else {
      this.orderService.customerDialog = false;
      this.checked = false;
    }
  }

  getCustomer(option) {
    this.customerBill = option.fname;
    this.customerDetial = option;
    console.log(this.customerDetial);
    this.showCustomer = false;
    this.showCmt = "Search Product";
    this.orderService.customerDialog = false;
  }

  removeCoupon() {
    if (this.couponRedeem) {
      this.couponName = "";
      this.couponRedeem = false;
      this.netAmount = this.beforRedeem;
      this.beforRedeem = null;
      this.showInfo("coupon is remove");
    }
  }

  couponget() {
    if (this.couponRedeem) {
      this.showError("Coupon already applied");
    }
    if (this.orderService.bill.length === 0) {
      this.showError("Bill is Empty");
    }
  }

  getCoupon(input) {
    if (!this.couponRedeem && this.orderService.bill.length !== 0) {
      this.orderService.coupon.forEach((code) => {
        if (input.value == code.off10) {
          this.beforRedeem = this.netAmount;
          this.couponName = input.value;
          this.netAmount = this.netAmount - (this.netAmount * 10) / 100;
          console.log("coupon : " + this.netAmount);
          this.couponRedeem = true;
          this.showToastr("10% off on bill");
        } else if (input.value == code.off20) {
          this.beforRedeem = this.netAmount;
          this.couponName = input.value;
          this.netAmount = this.netAmount - (this.netAmount * 20) / 100;
          console.log("coupon : " + this.netAmount);
          this.couponRedeem = true;
          this.showToastr("20% off on bill");
        } else if (input.value == code.off50) {
          this.beforRedeem = this.netAmount;
          this.couponName = input.value;
          this.netAmount = this.netAmount - (this.netAmount * 50) / 100;
          console.log("coupon : " + this.netAmount);
          this.couponRedeem = true;
          this.showToastr("50% off on bill");
        } else {
          this.showError("Invalide Coupon");
        }
      });
    } else if (this.couponRedeem) {
      this.showError("Coupon already applied");
    } else if (this.orderService.bill.length === 0) {
      this.showError("Bill is Empty");
    }
    input.value = "";
  }

  makeReceipt() {
    if (this.orderService.bill.length == 0) {
      this.showError("Bill is empty");
    } else {
      this.addReceipt();
    }
    console.log("bill di" + this.orderService.bill.length);
  }

  addReceipt() {
    let today: Date = new Date();
    let date =
      today.getDate() +
      "/ " +
      `${today.getMonth() + 1}` +
      "/ " +
      today.getFullYear();
    let month = this.getMonth(today);
    let time: string =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (this.cashPay != 0 || this.gpay) {
      this.orderService.receiptsData.push({
        billno: this.billNum,
        date: date,
        time: time,
        month: month,
        amount: this.netAmount,
        payed: this.gpay ? this.netAmount : this.cashPay,
        nettotal: this.totalPrice,
        employeeID: this.empId ? this.empId : 1001,
        payment: this.gpay ? "UPI" : "cash",
        paymentType: this.gpay ? "online" : "offline",
        transactionId: this.gpay ? this.upiTid : 0,
        status: "close",
        tax: (this.totalPrice * 2) / 100,
        customer: this.checked ? this.customerBill : "not selected",
        coupon: this.couponName ? this.couponName : "not Apply",
        billDetail: this.orderService.bill,
        customerDetail: this.customerDetial,
      });
      console.log(month);
      this.upiTid = 0;
      this.totalPrice = 0;
      this.cashPay = 0;
      this.netAmount = 0;
      this.beforRedeem = null;
      this.couponRedeem = false;
      this.couponName = undefined;
      this.customerBill = undefined;
      this.orderService.customerDialog = false;
      this.orderService.bill = [];
      this.checked = false;
      this.showInfo("Payment is added");
    } else {
      this.showError("Please collect cash and make bill");
    }
    console.log(this.orderService.receiptsData);
  }

  totalAmount() {
    let totalPriceValue = 0;
    // let totalQtyValue = 0;
    for (let cartValue of this.orderService.bill) {
      // debugger;
      totalPriceValue =
        Number(cartValue.qty) * cartValue.Iprice + totalPriceValue;
      // totalQtyValue += cartValue.qty;
    }
    this.totalPrice = totalPriceValue;
    this.netAmount = (this.totalPrice * 2) / 100 + this.totalPrice;
    // console.log(this.totalPrice);
  }
  getMonth(today: Date) {
    if (today.getMonth() + 1 == 1) {
      return "Janaury";
    } else if (today.getMonth() + 1 == 2) {
      return "February";
    } else if (today.getMonth() + 1 == 3) {
      return "March";
    } else if (today.getMonth() + 1 == 4) {
      return "April";
    } else if (today.getMonth() + 1 == 5) {
      return "May";
    } else if (today.getMonth() + 1 == 6) {
      return "June";
    } else if (today.getMonth() + 1 == 7) {
      return "July";
    } else if (today.getMonth() + 1 == 8) {
      return "August";
    } else if (today.getMonth() + 1 == 9) {
      return "September";
    } else if (today.getMonth() + 1 == 10) {
      return "October";
    } else if (today.getMonth() + 1 == 11) {
      return "November";
    } else if (today.getMonth() + 1 == 12) {
      return "December";
    }
  }
  source = new jqx.dataAdapter({ localData: this.makeBill });
  onChange(event) {
    this.makeBill.push();
    // this.orderService.bill = [...this.orderService.bill];
    this.totalAmount();
  }

  editBill(option) {
    this.makeBill.indexOf(option.index);
  }
  columnsList = [
    { text: "Sr No.", datafield: "srno" },
    { text: "Fast Name", datafield: "fname" },
    { text: "Last Name", datafield: "lname" },
    { text: "Mobile", datafield: "mobile" },
    { text: "Email", datafield: "email" },
  ];
  cList = new jqx.dataAdapter({ customerD: this.orderService.customerData });

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
