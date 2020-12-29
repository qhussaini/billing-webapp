import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../../../core/services/auth.service";

import { Notification, TopBar } from "./topbar.model";

import { notificationItems } from "./data";
import { EventService } from "src/app/core/services/event.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit {
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.topBar.screenHeight = window.innerHeight;
    this.topBar.screenWidth = window.innerWidth;
    console.log(
      "Width : " +
        this.topBar.screenWidth +
        " and Height: " +
        this.topBar.screenHeight
    );
  }
  notificationItems: Notification[];
  languages: Array<{
    id: number;
    flag?: string;
    name: string;
  }>;
  selectedLanguage: {
    id: number;
    flag?: string;
    name: string;
  };

  openMobileMenu: boolean;
  alertToolTip: string;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  acType: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public topBar: TopBar,
    private eventService: EventService
  ) {
    this.onResize();
    this.topBar.checkSize();
    this.acType = this.authService.currentUser().type;
    console.log("acType" + this.acType);
    if (this.acType === "emp") {
      this.topBar.isAdmin = false;
    } else {
      this.topBar.isAdmin = true;
    }
    this.alertToolTip = this.topBar.alertItem
      ? `${this.topBar.alertItem.length}`
      : "no";
  }

  ngOnInit() {
    // get the notifications
    this._fetchNotifications();
    this.openMobileMenu = false;
  }

  /**
   * Change the language
   * @param language language
   */
  changeLanguage(language) {
    this.selectedLanguage = language;
  }
  clearNotification() {
    this.topBar.alertItem = [];
  }

  changeView(touce: boolean, theme?: boolean) {
    this.topBar.selectedView = touce;
    this.topBar.selectedTheme = theme;
    console.log(this.topBar.selectedView);
  }
  darktheme(theme: string) {
    this.eventService.broadcast("changeLayout", "vertical");
    this.eventService.broadcast("changeLeftSidebarTheme", theme);
    this.eventService.broadcast("changeLeftSidebarType", "default");
    console.log(theme);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(["/account/login"]);
  }

  /**
   * Fetches the notification
   * Note: For now returns the hard coded notifications
   */
  _fetchNotifications() {
    this.notificationItems = notificationItems;
  }
}
