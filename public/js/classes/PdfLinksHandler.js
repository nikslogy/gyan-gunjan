import {$} from '../libs'

export default class PdfLinksHandler {

  constructor(pdf, ctrl, element) {
    this.pdf = pdf;
    this.ctrl = ctrl;
    this.element = $(element);
    this.cursors = [];
  }

  dispose() {

  }

  setHandler(handler) {
    this.handler = handler;
  }

  defaultHandler(type, destination) {
    if(type==='internal') {
      this.ctrl.goToPage(destination);
    }
    else if(type==='external') {
      if(destination.toLowerCase().search('javascript:')===-1) {
        window.open(destination, '_blank');
      }
    }
  }

  callHandlers(type, destination) {
    if(!this.handler || !this.handler(type, destination)) {
      this.defaultHandler(type, destination);
    }
  }

  handleEvent(data) {
    const e = data.event, anno = data.annotation;
    switch(e.type) {
      case 'mouseover': {
        this.cursors.push(this.element.css('cursor'));
        this.element.css('cursor', 'pointer');
        break;
      }
      case 'mouseout': {
        this.element.css('cursor', this.cursors.pop() || '');
        break;
      }
      case 'touchtap':
      case 'click': {
        if(anno.url) {
          this.callHandlers('external', anno.url);
        }
        else if(anno.dest) {
          this.pdf.getDestination(anno.dest).
            then((number)=> this.callHandlers('internal', number));
        }
        break;
      }
    }
  }

}
