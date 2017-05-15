import { MyThinschoolPage } from './app.po';

describe('my-thinschool App', () => {
  let page: MyThinschoolPage;

  beforeEach(() => {
    page = new MyThinschoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
