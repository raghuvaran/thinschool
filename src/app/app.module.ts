import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GetContentService } from './get-content.service';
import { SecHomeComponent } from './sec-home/sec-home.component';
import { SecCoursesComponent } from './sec-courses/sec-courses.component';
import { SecPartnersComponent } from './sec-partners/sec-partners.component';
import { SecAboutUsComponent } from './sec-about-us/sec-about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SecHomeComponent,
    SecCoursesComponent,
    SecPartnersComponent,
    SecAboutUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GetContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
