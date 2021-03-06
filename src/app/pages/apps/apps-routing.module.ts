import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";

import { CalendarComponent } from "./calendar/calendar.component";
import { OrderComponent } from "./order/order.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { ReceiptsComponent } from "./receipts/receipts.component";

const routes: Routes = [
  {
    path: "apps-calendar",
    component: CalendarComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "/",
    component: OrderComponent,
  },
  {
    path: "apps-receipts",
    component: ReceiptsComponent,
  },
  {
    path: "apps-purchase",
    component: PurchaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppsRoutingModule {}
