import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "src/app/core/services/event.service";

import { AuthenticationService } from "../../../core/services/auth.service";
import { SIDEBAR_WIDTH_CONDENSED } from "../../layout.model";
import { TopBar } from "../topbar/topbar.model";

@Component({
  selector: "app-leftsidebar",
  templateUrl: "./leftsidebar.component.html",
  styleUrls: ["./leftsidebar.component.scss"],
})
export class LeftsidebarComponent implements OnInit {
  userName: string;
  acType: string;
  @Input() sidebarType: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public topBar: TopBar
  ) {
    this.getUserName();
  }

  ngOnInit() {}

  /**
   * Is sidebar condensed?
   */
  isSidebarCondensed() {
    return this.sidebarType === SIDEBAR_WIDTH_CONDENSED;
  }

  /**
   * Logout the user
   */
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/account/login"], {
      queryParams: { returnUrl: "/" },
    });
  }
  getUserName() {
    this.userName = this.authenticationService.currentUser().username;
    this.acType = this.authenticationService.currentUser().type;
    console.log(":::" + this.authenticationService.currentUser().type);
  }
}
