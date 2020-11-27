import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
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

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
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
  billSet: boolean;
  // customerForm = new FormGroup ({
  //   customerData: new FormArray([])
  // });

  @ViewChild("grid", { static: false }) grid: jqxGridComponent;

  searchProductFn(subject) {
    if (!this.showCustomer) {
      return subject ? subject.IName : undefined;
    } else {
      return subject ? subject.fname : undefined;
    }
  }

  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;

  public forceScrollDown(): void {
    this.ngxAutoScroll.forceScrollDown();
  }

  constructor(
    private dialog: NgbModal,
    private toastr: ToastrService,
    public orderService: OrderService,
    public topBar: TopBar
  ) {
    this.topBar.checkSize();
    this.getBillSet();
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
  }
  ngAfterViewInit() {}
  getBillSet() {
    if (this.orderService.bill != []) {
      this.billSet = true;
    } else {
      this.billSet = false;
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
      timeOut: 1800,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true,
      closeButton: true,
    });
  }

  refreshPage() {
    window.location.reload();
  }

  showToastr() {
    this.toastr.success("Table added successfully", "Added", {
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
      this.showToastr();
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
      this.showToastr();
      this.orderService.testVal = this.orderService.customerData;
    }
  }
  getBillNo() {
    // if (this.makeBill != []) {
    let bnum = this.orderService.receiptsData.length;
    this.billNum = this.orderService.receiptsData[bnum - 1].billno + 1;
    console.log(this.billNum);
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
  addItem(icode, iname, gname, vendor, pprice, unit, sprice, shelf) {
    if (
      !icode.value &&
      !iname.value &&
      !gname.value &&
      !vendor.value &&
      !pprice.value &&
      !unit.value &&
      !shelf.value
    ) {
      this.showError("Table Field is empty");
    } else {
      this.orderService.products.push({
        src: "",
        ICode: icode.value,
        IName: iname.value,
        GName: gname.value,
        vendor: vendor.value,
        pPrice: pprice.value,
        IUnit: unit.value,
        sPrice: sprice.value,
        shelf: shelf.value,
        hold: false,
        holdName: "Hold Product",
        holdColor: "accent",
        holdIcon: "pan_tool",
      });
      icode.value = "";
      iname.value = "";
      gname.value = "";
      vendor.value = "";
      pprice.value = "";
      unit.value = "";
      sprice.value = "";
      shelf.value = "";
      this.showToastr();
    }
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
    this.billing.splice(item.no - 1, 1);
  }
  clearBill() {
    this.makeBill.pop();
  }

  columns = this.orderService.productDataColumns;

  bColumns = [
    { text: "Id", datafield: "ICode" },
    { text: "Name", datafield: "IName" },
    { text: "Unit", datafield: "IUnit" },
    { text: "Sale Price", datafield: "sPrice" },
  ];

  addbill(option, qtyno) {
    const prd = option.IName;
    const pri = option.sPrice;
    const code = option.ICode;
    const type = option.GName;
    const vendor = option.vendor;
    const shelf = option.shelf;
    const qty: number = qtyno.value;
    // let test: boolean = false;
    // for (let i = 0; i < this.makeBill.length; i++) {
    //   if (this.makeBill[i].Iname != option.IName) {
    //     this.orderService.bill.push({ Iname: prd, Iprice: pri, Icode: code, Itype: type, vendor: vendor, shelf: shelf, qty: qty });
    //     // search.value = '';
    //     qtyno.value = 1;
    //     this.totelAmount();
    //     console.log("test no 2")
    //   } else {
    //     console.log("test no 3")
    //   }
    //   console.log(test);
    // }
    // if (!test) {
    //   test = true;
    this.getBillNo();
    this.orderService.bill.push({
      Iname: prd,
      Iprice: pri,
      Icode: code,
      Itype: type,
      vendor: vendor,
      shelf: shelf,
      qty: qty,
    });
    // search.value = '';
    qtyno.value = 1;
    this.totelAmount();
    // }

    // debugger;
    // || add custom pipe to BILLING tabel ||

    // if (qtyno.value==0 ||this.makeBill.map(data => data.Iname) == option.IName) {
    //   this.showError('Product is alrady added need to add qty we click more then one time');
    // this.makeBill.push({ Iname: prd, Iprice: pri, Icode: code, Itype: type });
    // } else {

    // }
  }

  totelAmount() {
    let totalPriceValue = 0;
    // let totalQtyValue = 0;
    for (let cartValue of this.makeBill) {
      // debugger;
      totalPriceValue =
        Number(cartValue.qty) * cartValue.Iprice + totalPriceValue;
      // totalQtyValue += cartValue.qty;
    }
    this.totalPrice = totalPriceValue;
    // console.log(this.totalPrice);
  }

  source = new jqx.dataAdapter({ localData: this.makeBill });
  onChange(event) {
    this.makeBill.push();
  }
  editBill(option) {
    this.makeBill.indexOf(option.index);
  }
  tableData = [
    {
      itemType: "Chicken",
      itema: "1chicken",
      itemb: "2chicken",
      itemc: "3chicken",
      itemd: "4chicken",
      iteme: "5chicken",
    },
    {
      itemType: "Fish",
      itema: "1Fish",
      itemb: "2Fish",
      itemc: "3Fish",
      itemd: "4Fish",
      iteme: "5Fish",
    },
    {
      itemType: "beef",
      itema: "1Beef",
      itemb: "2Beef",
      itemc: "3Beef",
      itemd: "4Beef",
      iteme: "5Beef",
    },
    {
      itemType: "Mutton",
      itema: "1mutton",
      itemb: "2mutton",
      itemc: "3mutton",
      itemd: "4mutton",
      iteme: "5mutton",
    },
    {
      itemType: "Egg",
      itema: "1Egg",
      itemb: "2Egg",
      itemc: "3Egg",
      itemd: "4Egg",
      iteme: "5Egg",
    },
  ];
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
