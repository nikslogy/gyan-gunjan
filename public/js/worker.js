import {$, tr} from './libs';
import Detector from 'Detector';
import VisualWorld from 'VisualWorld';
import PdfLinksHandler from './classes/PdfLinksHandler';
import Book from './classes/Book';
import BookView from './classes/BookView';
import BookController from './classes/BookController';
import PdfBookPropsBuilder from './classes/PdfBookPropsBuilder';
import ClbBookPropsBuilder from './classes/ClbBookPropsBuilder';
import LoadingController from 'LoadingController';
import UserMessageController from 'UserMessageController';
import Search from 'Search';
import Bookmarks from 'Bookmarks';
import Thumbnails from 'Thumbnails';
import TocController from './classes/TocController';
import ShareController from './classes/ShareController';
import BookPrinter from './classes/BookPrinter';
import AutoNavigator from './classes/AutoNavigator';
import SoundsEnviroment from './classes/SoundsEnviroment';
import FullScreenX from 'FullScreenX';

export default function worker(parentContainer, options) {
  const scene = {
    dispose: function() {
      if(scene.ready) {
        !scene.pdfLinksHandler || scene.pdfLinksHandler.dispose();
        delete scene.pdfLinksHandler;
        scene.sounds.dispose();
        delete scene.sounds;
        scene.userMessageCtrl.dispose();
        delete scene.userMessageCtrl;
        scene.tocCtrl.dispose();
        delete scene.tocCtrl;
        scene.thumbnails.dispose();
        delete scene.thumbnails;
        !scene.bookmarks || scene.bookmarks.dispose();
        delete scene.bookmarks;
        scene.shareCtrl.dispose();
        delete scene.shareCtrl;
        scene.ctrl.dispose();
        delete scene.ctrl;
        scene.bookPrinter.dispose();
        delete scene.bookPrinter;
        scene.book.dispose();
        delete scene.book;
        scene.propsBuilder.dispose();
        delete scene.propsBuilder;
        delete scene.bookBuilder;
        scene.visual.dispose();
        delete scene.visual;
        scene.view.dispose();
        delete scene.view;
        delete scene.dispose;
      }
      else {
        scene.pendingDispose = true;
      }
    }
  };
  options = {...options};
  if(options.activateFullScreen) {
    FullScreenX.request(parentContainer);
  }
  scene.view = new BookView(parentContainer, ()=> {
    if(!Detector.webgl) {
      Detector.addGetWebGLMessage({parent: scene.view.getView()});
    }
    else {
      scene.loadingCtrl = new LoadingController(scene.view, true, (progress)=> progress===0? tr('Please wait... the Application is Loading'): tr('PDF is Loading:')+' '+progress+'%');
      scene.userMessageCtrl = new UserMessageController(scene.view);
      scene.visual = new VisualWorld(scene.view.getContainer().ownerDocument.defaultView, scene.view.getContainer().ownerDocument, scene.view.getRender());
      if(options.propertiesCallback) {
        new ClbBookPropsBuilder(scene.visual, ()=> ({type: 'blank'}), 1, (props)=> {
          props = options.propertiesCallback(props);
          const style = [];
          if(props.backgroundColor!=='') {
            style.push('background-color:#'+new THREE.Color(props.backgroundColor).getHexString());
          }
          if(props.backgroundImage!=='') {
            style.push('background-image:url(\''+props.backgroundImage+'\')');
          }
          if(props.backgroundStyle!=='') {
            style.push(props.backgroundStyle);
          }
          if(style.length) {
            scene.view.getView().attr('style', style.join(';'));
          }
        });
      }
      scene.bookBuilder = (props, sheets, pageCallback)=> {
        props.cssLayerProps = {
          ...props.cssLayerProps,
          scene
        };
        if(options.propertiesCallback) {
          props = options.propertiesCallback(props);
        }
        scene.book = new Book(scene.visual, sheets, pageCallback, props);
        scene.bookPrinter = new BookPrinter(scene.visual, scene.book, (options.template || {}).printStyle);
        scene.loadingCtrl.dispose();
        delete scene.loadingCtrl;
        scene.ctrl = new BookController(scene.book, scene.view, options.controlsProps);
        scene.book.setInjector((w)=> {
          w.jQuery = w.$ = $;
          w.book = scene.book;
          w.bookCtrl = scene.ctrl;
          if(props.injector) {
            props.injector(w);
          }
        });
        scene.view.addHandler(scene.ctrl);
        scene.ctrl.setPrinter(scene.bookPrinter);
        const test = pageCallback(0);

        scene.thumbnails = new Thumbnails(scene.visual, scene.view.getThumbnailsView(), pageCallback, scene.book.getRealPages(), {kWtoH: props.width/props.height});
        scene.tocCtrl = new TocController(scene.view, scene.ctrl);
        scene.tocCtrl.setThumbnails(scene.thumbnails);
        if(options.outline) {
          scene.bookmarks = new Bookmarks(scene.view.getBookmarksView(), options.outline);
          scene.tocCtrl.setBookmarks(scene.bookmarks);
        }
        scene.ctrl.setTocCtrl(scene.tocCtrl);
        scene.view.addHandler(scene.tocCtrl);
        scene.ctrl.setEmbeddedInline(options.embeddedInline);

        if(test.type==='pdf') {
          scene.search = new Search(scene.view.getSearchView(), scene.book.getRealPages());
          scene.search.onQuery = scene.book.setQuery.bind(scene.book);
          scene.book.addEventListener('searchResults', (e)=> {
            scene.search.setResults(e.results, e.lastPage);
          });
          scene.tocCtrl.setSearch(scene.search);
          scene.ctrl.setTocCtrl(scene.tocCtrl);

          scene.pdfLinksHandler = new PdfLinksHandler(test.src, scene.ctrl, scene.visual.element);
          scene.book.addEventListener('pdfAnnotation', scene.pdfLinksHandler.handleEvent.bind(scene.pdfLinksHandler));
          if(!scene.bookmarks) {
            test.src.getHandler((handler)=> {
              handler.getOutline().
                then((outline)=> {
                  if(outline && outline.length) {
                    scene.bookmarks = new Bookmarks(scene.view.getBookmarksView(), outline);
                    scene.tocCtrl.setBookmarks(scene.bookmarks, test.src);
                    scene.ctrl.setTocCtrl(scene.tocCtrl);
                  }
                });
            });
          }
          if(options.pdfLinks && options.pdfLinks.handler) {
            scene.pdfLinksHandler.setHandler(options.pdfLinks.handler);
          }
        }

        scene.sounds = new SoundsEnviroment(options.template);
        scene.ctrl.setSounds(scene.sounds);
        scene.sounds.subscribeFlips(scene.ctrl);

        scene.ready = true;
        const autoNavigator = new AutoNavigator(scene.visual, scene.ctrl, options.autoNavigation);
        scene.shareCtrl = new ShareController(scene.view, scene.ctrl, options.shareLinkBuilder? options.shareLinkBuilder: (page)=> {
          let u;
          if(new RegExp('([?&])'+autoNavigator.urlParam+'=[0-9]+').test(location.href)) {
            u = location.href.replace(new RegExp('([?&])'+autoNavigator.urlParam+'=[0-9]+'), '$1'+autoNavigator.urlParam+'='+page);
          }
          else {
            u = location.href.split('#')[0]+(~location.href.indexOf('?')? '&': '?')+autoNavigator.urlParam+'='+page+location.hash;
          }
          return u;
        });
        scene.ctrl.setShareCtrl(scene.shareCtrl);
        scene.view.addHandler(scene.shareCtrl);
        autoNavigator.dispose();
        if(options.ready) {
          options.ready(scene);
        }
        scene.ctrl.ready(scene);
        if(scene.pendingDispose) {
          scene.dispose();
        }
      };
      const onError = (e)=> {
        !scene.loadingCtrl || scene.loadingCtrl.dispose();
        delete scene.loadingCtrl;
        scene.userMessageCtrl.setError(e.message);
      };
      if(options.pdf) {
        scene.propsBuilder = new PdfBookPropsBuilder(options.pdf, scene.bookBuilder, options.bookStyle, options.pdfOpenOptions);
        scene.propsBuilder.pdf.setLoadingProgressClb(scene.loadingCtrl.setProgress.bind(scene.loadingCtrl));
        scene.propsBuilder.pdf.setErrorHandler(options.error || onError);
      }
      else if(options.pageCallback) {
        if(options.onPageCallbackError) {
          options.onPageCallbackError.push(options.error || onError);
        }
        scene.propsBuilder = new ClbBookPropsBuilder(scene.visual, options.pageCallback, options.pages, scene.bookBuilder, options.bookStyle);
      }
      else {
        scene.propsBuilder = new ClbBookPropsBuilder(scene.visual, Book.pageCallback, 6, scene.bookBuilder, options.bookStyle);
      }
    }
  }, options.template);
  return scene;
}
