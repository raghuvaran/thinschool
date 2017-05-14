import { Component, OnInit } from '@angular/core';
import {GetContentService} from '../get-content.service';

declare function initCollapsible(): void;
@Component({
  selector: 'app-sec-courses',
  templateUrl: './sec-courses.component.html',
  styleUrls: ['./sec-courses.component.css'],
  providers: [GetContentService]
})
export class SecCoursesComponent implements OnInit {

  courses: Courses[];

  constructor(private content: GetContentService) {

    this.content.getContentData().subscribe(data => {
      this.courses = data.courses;
      console.log(this);
    });
  }

  ngOnInit() {
    initCollapsible();
  }

}

interface Courses {
  title: string;
  icon:  string;
  body:  string;
}
