import { BlitzinfoBootstrapPage } from './app.po';

describe('blitzinfo-bootstrap App', () => {
  let page: BlitzinfoBootstrapPage;

  beforeEach(() => {
    page = new BlitzinfoBootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
