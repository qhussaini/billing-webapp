import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  testVal = [];
  constructor() {}
  products: Product[] = [
    {
      src:
        "https://images-na.ssl-images-amazon.com/images/I/81d%2B4M0aFjL._SL1500_.jpg",
      ICode: "ptb",
      IName: "Skippy Peanut Butter",
      GName: "dairy",
      vendor: "Skippy",
      pPrice: 5,
      IUnit: 10,
      sPrice: 6.5,
      shelf: 1.1,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      active: true,
    },
    {
      src: "../../../../assets/images/products/Nutella-HazelnutSpread.jpg",
      ICode: "nhs",
      IName: "Nutella Hazelnut Spread",
      GName: "Food",
      vendor: "Nutella",
      pPrice: 9,
      IUnit: 20,
      sPrice: 10.5,
      shelf: 1.2,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      active: true,
    },
    {
      src: "../../../../assets/images/products/EATAnytime-MixedDryFruit.jpg",
      ICode: "mdf",
      IName: "EAT Anytime Mixed Dry Fruit",
      GName: "nuts",
      vendor: "EAT Anytime",
      pPrice: 10,
      IUnit: 50,
      sPrice: 12,
      shelf: 1.3,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      active: true,
    },
    {
      src: "../../../../assets/images/products/sandisk-MicroSd128g.jpg",
      ICode: "smsd",
      IName: "sandisk Micro Sd 128g",
      GName: "mobile accessories",
      vendor: "sandisk",
      pPrice: 150,
      IUnit: 20,
      sPrice: 159,
      shelf: 2.1,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      active: true,
    },
    {
      src: "../../../../assets/images/products/Sony-WF-1000XM3.jpg",
      ICode: "beb",
      IName: "Sony WF-1000XM3",
      GName: "mobile accessories",
      vendor: "Sony",
      pPrice: 199,
      IUnit: 50,
      sPrice: 210,
      shelf: 2.2,
      hold: false,
      holdColor: "accent",
      holdName: "Hold Product",
      holdIcon: "pan_tool",
      active: true,
    },
  ];
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
  ICode: string;
  IName: string;
  GName: string;
  vendor: string;
  pPrice: number;
  hold: boolean;
  holdColor: string;
  holdName: string;
  holdIcon: string;
  IUnit: number;
  sPrice: number;
  shelf: number;
  active: boolean;
}
