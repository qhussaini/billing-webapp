import { Injectable } from "@angular/core";

// Notification items
export interface Notification {
  icon?: string;
  color?: string;
  title: string;
  text: string;
  image?: string;
}

@Injectable({
  providedIn: "root",
})
export class TopBar {
  selectedView: boolean = false;
  selectedTheme: boolean = false;
  screenHeight: number;
  screenWidth: number;
  isAdmin: boolean;
  alertItem: Notification[] = [];
  newAlert: boolean = false;
  alertCheck(alert: boolean) {
    this.newAlert = alert;
  }
  checkSize() {
    if (this.screenWidth <= 768) {
      this.selectedView = true;
    } else {
      this.selectedView = false;
    }
  }
}
