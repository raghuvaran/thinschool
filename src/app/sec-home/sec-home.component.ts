import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {GetContentService} from '../get-content.service';

declare function initSlider(): void;
declare function initTabs(): void;

@Component({
  selector: 'app-sec-home',
  templateUrl: './sec-home.component.html',
  styleUrls: ['./sec-home.component.css'],
  providers: [GetContentService]
})
export class SecHomeComponent implements OnInit, AfterViewChecked {
  main_text: string;

  card_1: Card;
  card_2: Card;
  slides: Slides[];
  private isSliderReady: boolean;
  private areTabsReady:  boolean;
  constructor(private content: GetContentService) {

    this.content.getContentData().subscribe(data => {
      this.main_text = data.home.main_text;
      this.card_1 = data.home.card_1;
      this.card_2 = data.home.card_2;
      this.slides = data.home.slider;

      console.log(this);
      if (this.isSliderReady == null) {this.isSliderReady = true; }
      if (this.areTabsReady == null) {this.areTabsReady = true; }

    });
  }



  ngOnInit() {
  }


  ngAfterViewChecked() {
    if (this.isSliderReady) {
      initSlider();
      this.isSliderReady = false;
    }
    if (this.areTabsReady) {
      initTabs();
      this.areTabsReady = false;
    }


  }




}

interface Card {
  heading: string;
  body:    string;
  img:     string;
  link:    Link;
}

interface Link {
  text: string;
  url:  string;
}

interface Slides {
  title: string;
  align: string;
  body:  string;
  img:   string;
}
