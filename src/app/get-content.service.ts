import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetContentService {

  constructor(private http: Http) { }

  getContentData() {
    return this.http.get('assets/content.json')
      .map(res => res.json());
  }

}
