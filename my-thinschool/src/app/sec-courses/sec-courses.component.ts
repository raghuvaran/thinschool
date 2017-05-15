import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {GetContentService} from '../get-content.service';

declare function initCollapsible(): void;
@Component({
  selector: 'app-sec-courses',
  templateUrl: './sec-courses.component.html',
  styleUrls: ['./sec-courses.component.css'],
  providers: [GetContentService]
})
export class SecCoursesComponent implements OnInit, AfterViewChecked {
  courses: Courses[];


  private isCollapsibleReady: boolean;
  constructor(private content: GetContentService) {

    this.content.getContentData().subscribe(data => {
      this.courses = data.courses;
      console.log(this);
      if (this.isCollapsibleReady == null) {this.isCollapsibleReady = true; }
    });
  }

  ngOnInit() {
  }


  ngAfterViewChecked(): void {
    if (this.isCollapsibleReady) {initCollapsible(); this.isCollapsibleReady = false; }
  }
}

interface Courses {
  title: string;
  icon:  string;
  body:  string;
}
