import {Component, OnInit} from '@angular/core';
import {GetContentService} from '../get-content.service';

@Component({
  selector: 'app-sec-partners',
  templateUrl: './sec-partners.component.html',
  styleUrls: ['./sec-partners.component.css'],
  providers: [GetContentService]
})
export class SecPartnersComponent implements OnInit {
  schools: Schools[];
  bg: string;
  constructor(private content: GetContentService) {

    this.content.getContentData().subscribe(data => {
      this.bg = data.partners.bg;
      this.schools = data.partners.partners;
      console.log(this);
    });
  }

  getBackground() {
    if (this.bg != null) {
      return 'background: url("' + this.bg + '");';
    }
      return '';
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
