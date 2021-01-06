import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import data from "../../../../assets/data.json";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  testVal = [];
  barcodeValue: any;
  constructor(private toastr: ToastrService) {}
  categorys: category[] = [
    { categoryName: "Biscuits" },
    { categoryName: "Gourment&WorldFood" },
    { categoryName: "Oil" },
    { categoryName: "Scop" },
    { categoryName: "Snacks&BranedFood" },
    { categoryName: "Pure Ghee" },
    { categoryName: "Fruits&Vegetables" },
    { categoryName: "Foodgrains" },
    { categoryName: "Masala" },
    { categoryName: "Health" },
    { categoryName: "Baby" },
    { categoryName: "Dairy" },
    { categoryName: "Beverages" },
    { categoryName: "Eggs,Meat&Fish" },
    { categoryName: "Sports&Outdoors" },
    { categoryName: "Body Care" },
    { categoryName: "Organic Items" },
    { categoryName: "Mobile&Accessories" },
    { categoryName: "Stationary" },
  ];
  products: Product[] = [
    {
      src:
        "https://images-na.ssl-images-amazon.com/images/I/81d%2B4M0aFjL._SL1500_.jpg",
      ICode: 8711909624,
      IName: "Skippy Peanut Butter",
      Category: "Gourment&WorldFood",
      vendor: "Skippy",
      pPrice: 5,
      IUnit: 10,
      sPrice: 6.5,
      shelf: 1.1,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      Available: true,
    },
    {
      src: "../../../../assets/images/products/Nutella-HazelnutSpread.jpg",
      ICode: 8584886995,
      IName: "Nutella Hazelnut Spread",
      Category: "Gourment&WorldFood",
      vendor: "Nutella",
      pPrice: 9,
      IUnit: 20,
      sPrice: 10.5,
      shelf: 1.2,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      Available: true,
    },
    {
      src: "../../../../assets/images/products/EATAnytime-MixedDryFruit.jpg",
      ICode: 8589996584,
      IName: "EAT Anytime Mixed Dry Fruit",
      Category: "Foodgrains",
      vendor: "EAT Anytime",
      pPrice: 10,
      IUnit: 50,
      sPrice: 12,
      shelf: 1.3,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      Available: true,
    },
    {
      src: "../../../../assets/images/products/sandisk-MicroSd128g.jpg",
      ICode: 8589985642,
      IName: "sandisk Micro Sd 128g",
      Category: "Mobile&Accessories",
      vendor: "sandisk",
      pPrice: 150,
      IUnit: 20,
      sPrice: 159,
      shelf: 2.1,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      Available: true,
    },
    {
      src: "../../../../assets/images/products/Sony-WF-1000XM3.jpg",
      ICode: 8586755468,
      IName: "Sony WF-1000XM3",
      Category: "Mobile&Accessories",
      vendor: "Sony",
      pPrice: 199,
      IUnit: 50,
      sPrice: 210,
      shelf: 2.2,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      Available: true,
    },
  ];
  // products: Product[] = data;
  productDataColumns = [
    { text: "Id", datafield: "ICode" },
    { text: "Name", datafield: "IName" },
    { text: "Group Name", datafield: "GName" },
    { text: "Vendor", datafield: "vendor" },
    { text: "Purchase Price", datafield: "pPrice" },
    { text: "Unit", datafield: "IUnit" },
    { text: "Sale Price", datafield: "sPrice" },
    { text: "Shelf", datafield: "shelf" },
  ];
  customerDialog: boolean = false;
  selection = [
    "Mobile Phone",
    "Groceries",
    "Mobile Accessories",
    "Home Appliances",
    "Snacks",
  ];
  dataJson = data;

  bill: Bill[] = [];

  holdBill: Bill[];

  today = new Date();
  date =
    `${this.today.getDate() - 1}` +
    "/ " +
    `${this.today.getMonth() + 1}` +
    "/ " +
    this.today.getFullYear();
  lastDate =
    `${this.today.getDate() - 1}` +
    "/ " +
    `${this.today.getMonth()}` +
    "/ " +
    this.today.getFullYear();

  receiptsData: receipt[] = [];

  coupon = [{ off50: "SAOFF50", off20: "SAOFF20", off10: "SAOFF10" }];

  customerData = [
    {
      srno: 1,
      fname: "syed",
      lname: "quyyum",
      mobile: "9822222222",
      email: "quyyum@demo.com",
    },
    {
      srno: 2,
      fname: "anwaar",
      lname: "hussaini",
      mobile: "9855555555",
      email: "ans.data@demo.com",
    },
    {
      srno: 3,
      fname: "demo",
      lname: "abrar",
      mobile: "9844444444",
      email: "syed.da@demo.com",
    },
    {
      srno: 4,
      fname: "Syed",
      lname: "furkhan",
      mobile: "9833333333",
      email: "syedhus@demo.com",
    },
    {
      srno: 5,
      fname: "quyyum",
      lname: "anwaar",
      mobile: "9878888888",
      email: "anwaar@demo.com",
    },
    {
      srno: 6,
      fname: "saas",
      lname: "malik",
      mobile: "9866666666",
      email: "saas@demo.com",
    },
    {
      srno: 7,
      fname: "hussaini",
      lname: "demo",
      mobile: "9877777777",
      email: "saasemail@demo.com",
    },
    {
      srno: 8,
      fname: "Syed",
      lname: "furkhan",
      mobile: "9833333333",
      email: "syedhus@demo.com",
    },
    {
      srno: 9,
      fname: "saas",
      lname: "malik",
      mobile: "9866666666",
      email: "saas@demo.com",
    },
    {
      srno: 10,
      fname: "demo",
      lname: "abrar",
      mobile: "9844444444",
      email: "syed.da@demo.com",
    },
    {
      srno: 11,
      fname: "hussaini",
      lname: "demo",
      mobile: "9877777777",
      email: "saasemail@demo.com",
    },
    {
      srno: 12,
      fname: "anwaar",
      lname: "hussaini",
      mobile: "9855555555",
      email: "ans.data@demo.com",
    },
  ];

  showError(error: string) {
    this.toastr.error(error, "Error", {
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
  billNum: number;
  totalPrice: number = 0;
  netAmount: number;

  getBillNo() {
    // if (this.makeBill != []) {
    let bnum = this.receiptsData.length;
    this.billNum = bnum !== 0 ? this.receiptsData[bnum - 1].billno + 1 : 5001;
    // console.log(bnum);
    // }
  }
  totalAmount() {
    let totalPriceValue = 0;
    // let totalQtyValue = 0;
    for (let cartValue of this.bill) {
      // debugger;
      totalPriceValue =
        Number(cartValue.qty) * cartValue.Iprice + totalPriceValue;
      // totalQtyValue += cartValue.qty;
    }
    this.totalPrice = totalPriceValue;
    this.netAmount = (this.totalPrice * 2) / 100 + this.totalPrice;
    // // console.log(this.totalPrice);
  }
  scannerSound() {
    let sound = new Audio();
    sound.src = "assets/barcode.wav";
    sound.load();
    sound.play();
  }

  scannerValue() {
    let dup = false;
    this.products.forEach((addProduct) => {
      if (this.barcodeValue == addProduct.ICode) {
        if (addProduct.IUnit == 0 || addProduct.hold === true) {
          if (addProduct.hold === true) {
            this.showError(addProduct.IName + " is on hold");
          } else {
            this.showError(addProduct.IName + " is not available");
            addProduct.Available = false;
          }
        } else {
          if (this.bill.length === 0) {
            this.bill.push({
              Iname: addProduct.IName,
              Iprice: addProduct.sPrice,
              Icode: addProduct.ICode,
              Itype: addProduct.Category,
              vendor: addProduct.vendor,
              shelf: addProduct.shelf,
              qty: 1,
            });
            this.scannerSound();
            addProduct.IUnit = addProduct.IUnit - 1;
          } else {
            this.bill.forEach((value) => {
              if (value.Iname === addProduct.IName) {
                value.qty++;
                dup = true;
                addProduct.IUnit = addProduct.IUnit - 1;
                this.scannerSound();
                this.showToastr(addProduct.IName + " is added successfully");
              }
            });
            if (!dup && this.bill.length !== 0) {
              this.bill.push({
                Iname: addProduct.IName,
                Iprice: addProduct.sPrice,
                Icode: addProduct.ICode,
                Itype: addProduct.Category,
                vendor: addProduct.vendor,
                shelf: addProduct.shelf,
                qty: 1,
              });
              this.scannerSound();
              addProduct.IUnit = addProduct.IUnit - 1;
            }
          }
        }
        this.getBillNo();
        this.totalAmount();
      }
    });
  }
}
export interface Customer {
  srno: number;
  fname: string;
  lname: string;
  mobile: string;
  email: string;
}
export interface Bill {
  Iname: string;
  Iprice: number;
  Icode: string;
  Itype: string;
  vendor: string;
  shelf: number;
  qty: number;
}
export interface receipt {
  billno: number;
  date: string;
  time: string;
  month: string;
  amount: number;
  payed: number;
  nettotal: number;
  coupon?: string;
  tax: number;
  paymentType: string;
  transactionId?: number;
  payment: string;
  customer?: string;
  status: string;
  employeeID: number;
  billDetail: Bill[];
  customerDetail?: Customer[];
}
export interface Product {
  src: string;
  ICode: any;
  IName: string;
  Description?: string;
  Category: string;
  vendor: string;
  pPrice: number;
  hold: boolean;
  holdColor: string;
  holdName: string;
  holdIcon: string;
  IUnit: number;
  sPrice: number;
  shelf?: number;
  Available: boolean;
}
export interface category {
  categoryName: string;
}
