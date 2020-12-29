import { Component, OnInit } from "@angular/core";

import {
  revenueAreaChart,
  targetsBarChart,
  salesDonutChart,
  ordersData,
} from "./data";

import { ChartType, OrdersTable } from "./dashboard.model";
import { TopBar } from "src/app/layouts/shared/topbar/topbar.model";
import { OrderService } from "../apps/order/order.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})

/**
 * Dashboard component - handling dashboard with sidear and content
 */
export class DashboardComponent implements OnInit {
  totalProfit: any;
  constructor(public topBar: TopBar, public orders: OrderService) {}

  revenueAreaChart: ChartType;
  targetsBarChart: ChartType;
  salesDonutChart: ChartType;
  ordersData: OrdersTable[];
  todaySale: number = 0;
  todaySaleDown: boolean = true;
  todayPer: number = 0;
  lastClose: number = 0;
  toCustomer: number = 0;
  monthlysale: number = 0;
  monthSaleDown: boolean = true;
  monthPer: number = 0;
  lastMonth: number = 0;

  ngOnInit() {
    let today = new Date();
    let date =
      today.getDate() +
      "/ " +
      `${today.getMonth() + 1}` +
      "/ " +
      today.getFullYear();
    let yesterday =
      `${today.getDate() - 1}` +
      "/ " +
      `${today.getMonth() + 1}` +
      "/ " +
      today.getFullYear();
    let lastMonth = `${today.getMonth()}`;
    let thisMonth = date.split("/ ", 2);
    this.orders.receiptsData.forEach((sale) => {
      //getting today's total sale data
      if (sale.date === date) {
        this.todaySale = this.todaySale + sale.amount;
        this.todayPer =
          (100 * (this.todaySale - this.lastClose)) / this.lastClose;
        if (this.todayPer > 0) {
          this.todaySaleDown = false;
        } else {
          this.todaySaleDown = true;
        }
      }
      //getting yesterday's total sale data
      if (sale.date === yesterday) {
        this.lastClose = this.lastClose + sale.amount;
      }
      let month = sale.date.split("/ ", 2);
      //getting this Month's total sale data
      if (month[1] === thisMonth[1]) {
        this.monthlysale = this.monthlysale + sale.amount;
        this.monthPer =
          (100 * (this.monthlysale - this.lastMonth)) / this.lastMonth;
        if (this.monthPer > 0) {
          this.monthSaleDown = false;
        } else {
          this.monthSaleDown = true;
        }
      }
      //getting last Month's total sale data
      if (month[1] === lastMonth) {
        this.lastMonth = this.lastMonth + sale.amount;
      }
    });
    this.toCustomer = this.orders.customerData.length;
    this._fetchData();
    this.totalProfit = (this.monthlysale * 40) / 100;
  }

  /**
   * fetches the dashboard value
   */
  private _fetchData() {
    this.revenueAreaChart = revenueAreaChart;
    this.targetsBarChart = targetsBarChart;
    this.salesDonutChart = salesDonutChart;
    this.ordersData = ordersData;
  }
}
