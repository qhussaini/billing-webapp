import { Component, OnInit } from "@angular/core";

import {
  revenueAreaChart,
  targetsBarChart,
  salesDonutChart,
  ordersData,
} from "./data";

import { ChartType, OrdersTable } from "./dashboard.model";
import { TopBar } from "src/app/layouts/shared/topbar/topbar.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})

/**
 * Dashboard component - handling dashboard with sidear and content
 */
export class DashboardComponent implements OnInit {
  constructor(public topBar: TopBar) {}

  revenueAreaChart: ChartType;
  targetsBarChart: ChartType;
  salesDonutChart: ChartType;
  ordersData: OrdersTable[];

  ngOnInit() {
    /**
     * Fetches the data
     */
    this._fetchData();
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
