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
  checkSize() {
    if (this.screenWidth <= 768) {
      this.selectedView = true;
    } else {
      this.selectedView = false;
    }
  }
}
