import { Component, OnInit } from '@angular/core';
import {GetContentService} from '../get-content.service';

@Component({
  selector: 'app-sec-partners',
  templateUrl: './sec-partners.component.html',
  styleUrls: ['./sec-partners.component.css'],
  providers: [GetContentService]
})
export class SecPartnersComponent implements OnInit {
  schools: Schools[];

  constructor(private content: GetContentService) {

    this.content.getContentData().subscribe(data => {
      this.schools = data.partners;
      console.log(this);
    });
  }

  ngOnInit() {
  }

}


interface Schools {
  name: string;
  img:  string;
  body: string;
  link: Link;
}
interface Link {
  text: string;
  url:  string;
}
