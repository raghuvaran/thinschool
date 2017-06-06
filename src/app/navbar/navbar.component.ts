import { Component, OnInit } from '@angular/core';
import {GetContentService} from '../get-content.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [GetContentService]
})
export class NavbarComponent implements OnInit {

  title: string;
  logo: string;
  top_right_menu: Menu[];
  nav_menu: Menu[];
  constructor(private content: GetContentService) {

    this.content.getContentData().subscribe(data => {
      this.title = data.title;
      this.logo = data.logo;
      this.top_right_menu = data.top_right_menu;
      this.nav_menu = data.nav_menu;

    });
  }

  ngOnInit() {
  }

}

interface Menu {
  option: string;
  url:    string;
}
