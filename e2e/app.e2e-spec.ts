import { Angular2MdlFirebasePage } from './app.po';

describe('angular2-mdl-firebase App', function() {
  let page: Angular2MdlFirebasePage;

  beforeEach(() => {
    page = new Angular2MdlFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
