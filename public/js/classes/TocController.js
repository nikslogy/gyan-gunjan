import WidgetController from 'WidgetController';

export default class TocController extends WidgetController {

  constructor(view, bookCtrl) {
    super(view, 'widFloatWnd');
    this.bookCtrl = bookCtrl;
    this.tab = 'none';
  }

  setThumbnails(thumbnails) {
    this.thumbnails = thumbnails;
    thumbnails.onNavigate = this.navigateThumbnails.bind(this);
    if(this.tab === 'none') {
      this.tab = 'thumbnails';
    }
    this.fireChange();
  }

  setSearch(search) {
    this.search = search;
    search.onNavigate = this.navigateSearch.bind(this);
    this.fireChange();
  }

  setBookmarks(bookmarks, pdf) {
    if(bookmarks.getSize()) {
      this.bookmarks = bookmarks;
      this.pdf = pdf;
      bookmarks.onNavigate = this.navigateBookmarks.bind(this);
      this.isBookmarks = true;
      this.fireChange();
    }
  }

  cmdBookmarks() {
    this.setActiveTab('bookmarks');
  }

  cmdThumbnails() {
    this.setActiveTab('thumbnails');
  }

  cmdSearch() {
    this.setActiveTab('search');
  }

  setActiveTab(tab) {
    if(this[tab]) {
      this.tab = tab;
      this.fireChange();
    }
  }

  cmdCloseToc() {
    this.hide();
  }

  navigateThumbnails(number) {
    this.goToPage(number);
  }

  navigateSearch(number) {
    this.goToPage(number);
  }

  openUrl(url) {
    if(url.toLowerCase().search('javascript:')===-1) {
      window.open(url, '_blank');
    }
  }

  goToPage(number) {
    this.bookCtrl.goToPage(number);
  }

  dstDataHandler(data) {
    data = (data+'').trim();
    let number;
    if((number=parseInt(data))==data) {
      this.goToPage(number);
    }
    else {
      this.openUrl(data);
    }
  }

  navigateBookmarks(item) {
    if(item.url) {
      this.openUrl(item.url);
    }
    else if(item.dest) {
      this.pdf.getDestination(item.dest).
        then((number)=> this.goToPage(number));
    }
    else if(item.dstData!==undefined) {
      this.dstDataHandler(item.dstData);
    }
  }

  updateView() {
    if(this.view) {
      this.view.setState('widTocMenu', {
        enable: true,
        visible: true,
        active: false
      });
      this.view.setState('widThumbnails', {
        enable: true,
        visible: this.tab==='thumbnails',
        active: false
      });
      this.view.setState('widSearch', {
        enable: true,
        visible: this.tab==='search',
        active: false
      });
      this.view.setState('widBookmarks', {
        enable: true,
        visible: this.tab==='bookmarks',
        active: false
      });
      this.view.setState('cmdBookmarks', {
        enable: true,
        visible: !!this.bookmarks,
        active: this.tab==='bookmarks'
      });
      this.view.setState('cmdCloseToc', {
        enable: true,
        visible: true,
        active: false
      });
      this.view.setState('cmdThumbnails', {
        enable: true,
        visible: !!this.thumbnails && !!(this.search || this.bookmarks),
        active: this.tab==='thumbnails'
      });
      this.view.setState('cmdSearch', {
        enable: true,
        visible: !!this.search,
        active: this.tab==='search'
      });
      Promise.resolve().then(()=> this.thumbnails.setEnable(this.visible && this.tab==='thumbnails'));
      super.updateView();
    }
  }

}
