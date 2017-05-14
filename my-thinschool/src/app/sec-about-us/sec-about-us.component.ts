import { Component, OnInit } from '@angular/core';
import {GetContentService} from '../get-content.service';

@Component({
  selector: 'app-sec-about-us',
  templateUrl: './sec-about-us.component.html',
  styleUrls: ['./sec-about-us.component.css']
})
export class SecAboutUsComponent implements OnInit {
  title: string;
  body:  string;
  constructor(private content: GetContentService) {

    this.content.getContentData().subscribe(data => {
      this.title = data.about_us.title;
      this.body  = data.about_us.body;
      console.log(this);
    });
  }

  ngOnInit() {
  }

}
