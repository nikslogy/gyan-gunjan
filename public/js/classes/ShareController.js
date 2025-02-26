import {$, tr} from '../libs';
import WidgetController from 'WidgetController';

export default class ShareController extends WidgetController {

  constructor(view, bookCtrl, linkBuilder=(page)=> page) {
    super(view, 'widShare');
    this.bookCtrl = bookCtrl;
    this.linkBuilder = linkBuilder;
    bookCtrl.addEventListener('endFlip', this.updateView.bind(this));
  }

  cmdCloseShare() {
    this.hide();
  }

  clickLink(u, blank=true) {
    const a = $('<a href="'+u+'"'+(blank? ' target="_blank"': '')+'></a>').appendTo(this.view.getContainer());
    a[0].click();
    a.remove();
  }

  cmdFacebook() {
    this.clickLink('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(this.getLink()));
  }

  cmdTwitter() {
    this.clickLink('http://twitter.com/share?url='+encodeURIComponent(this.getLink()));
  }

  cmdEmail() {
    this.clickLink('mailto:?subject='+tr('We wanted you to see this book')+'&body='+tr('Check out this site')+' '+encodeURIComponent(this.getLink()), false);
  }

  getLink() {
    return this.linkBuilder(this.bookCtrl.getPageForGUI());
  }

  updateView() {
    if(this.view) {
      for(let cmd of ['cmdCloseShare', 'cmdFacebook', 'cmdTwitter', 'cmdEmail']) {
        this.view.setState(cmd, {
          enable: true,
          visible: true,
          active: false
        });
      }
      this.view.setState('txtShareLink', {
        value: this.getLink(),
        visible: true
      });
      super.updateView();
    }
  }

}
