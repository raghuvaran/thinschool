import { Component, OnInit } from '@angular/core';
import {GetContentService} from '../get-content.service';

@Component({
  selector: 'app-sec-pilot-project',
  templateUrl: './sec-pilot-project.component.html',
  styleUrls: ['./sec-pilot-project.component.css']
})
export class SecPilotProjectComponent implements OnInit {
schools: Schools[];
  bg: string;
  constructor(private content: GetContentService) {

    this.content.getContentData().subscribe(data => {
      this.bg = 'background: url("' + data.pilot_project.bg + '");';
      this.schools = data.pilot_project.partners;
      console.log(this);
    });
  }

  getBackground() {
    console.log('Called getBackground');
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
