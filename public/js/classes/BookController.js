import {$, THREE} from '../libs';
import Controller from 'Controller';
import {props as  bookControllerProps} from '../props/bookController';
import EventsToActions from 'EventsToActions';
import Stats from 'stats.js';
import Object3DWatcher from 'Object3DWatcher';
import FullScreenX from 'FullScreenX';

export default class BookController extends Controller {

  constructor(book, view, props) {
    super();
    this.navigationControls = true;
    this.book = book;
    this.visual = book.visual;
    this.p = BookController.prepareProps(props);
    this.p.rtl = book.p.rtl;

    this.orbit = book.visual.getOrbit();
    book.setFlipProgressClb(this.updateViewIfState.bind(this));
    this.view = view;
    this.bindActions();

    if(this.isSinglePageAvailable() && this.book.p.singlePageMode==='half' && (this.actions['cmdSinglePage'].active || this.actions['cmdSinglePage'].activeForMobile && this.visual.isMobile()) && !this.book.isHalfBookMode()) {
      this.book.togleHalfBookMode();
    }

    this.state = {
      smartPan: !this.actions['cmdSmartPan'].active,
      singlePage: this.isSinglePageAvailable() && this.book.p.singlePageMode==='full'? this.actions['cmdSinglePage'].active || this.actions['cmdSinglePage'].activeForMobile && this.visual.isMobile(): false,
      stats: this.actions['cmdStats'].active,
      activeSide: 1,
      autoPlay: this.actions['cmdAutoPlay'].active
    };

    const box0 = new THREE.Box3(), box1 = new THREE.Box3(),
          bookWidth = book.openedBox.max.x-book.openedBox.min.x;
    this.bookWatcher = new Object3DWatcher(this.visual, ()=> {
      if(this.state.singlePage) {
        if(this.state.activeSide) {
          box0.setFromObject(book.rightCover.three);
        }
        else {
          box0.setFromObject(book.leftCover.three);
        }
      }
      else if(this.book && this.book.isHalfBookMode()) {
        if(this.p.rtl) {
          box0.setFromObject(book.leftCover.three);
        }
        else {
          box0.setFromObject(book.rightCover.three);
        }
      }
      else {
        box0.setFromObject(book.leftCover.three);
        box1.setFromObject(book.rightCover.three);
        box0.union(box1);
        const width = Math.max(box0.min.x-box0.min.x, bookWidth), x0 = (box0.min.x+box0.max.x)/2;
        box0.min.x = x0-0.5*width;
        box0.max.x = x0+0.5*width;
      }
      return box0;
    });
    this.bookWatcher.scale = this.p.scale.default;
    this.book.setZoom(this.bookWatcher.scale, this.state.singlePage);

    this.Stats = new Stats();
    this.Stats.domElement.style.position = 'absolute';
    this.Stats.domElement.style.top = '0px';

    this.binds = {
      onScreenModeChanged: this.onScreenModeChanged.bind(this),
      stats: this.Stats.update.bind(this.Stats),
      onUpdateView: this.updateView.bind(this)
    }
    FullScreenX.addEventListener(this.view.getParentContainer().ownerDocument, this.binds.onScreenModeChanged);

    this.cmdSmartPan();

    this.book.enableLoadingAnimation(this.p.loadingAnimation.book);
    if(this.p.loadingAnimation.skin) {
      this.initLoadingAnimation();
    }

    // this.book.enableLoadingAnimation(this.p.loadingAnimation.book);
    this.book.setAutoResolution(this.p.autoResolution);

    this.visual.addEventListener('resize', this.updateView.bind(this));
    this.book.addEventListener('pendingPlayers', this.updateView.bind(this));

    if(this.state.autoPlay) {
      this.autoPlay();
    }
  }

  dispose() {
    FullScreenX.removeEventListener(this.view.getParentContainer().ownerDocument, this.binds.onScreenModeChanged);
    delete this.book;
    delete this.view;
    delete this.visual;
  }

  ready(scene) {
    if(this.view.templateObject.appLoaded) {
      Promise.resolve().then(()=> this.view.templateObject.appLoaded(scene));
    }
  }

  loadingAnimationHandler() {
    const pages = this.book.getTopPages();
    let visible = false;
    for(let n of pages) {
      const state = this.book.getPageState(n);
      visible = state!=='active';
      if(visible) {
        break;
      }
    }
    visible = visible || this.printer && this.printer.loading;
    if(visible) {
      if(!this.pendingLoadingAnimation) {
        this.pendingLoadingAnimation = true;
        setTimeout(()=> {
          if(this.pendingLoadingAnimation && this.view) {
            this.view.setState('widLoading', {
              visible
            });
          }
        }, 2000);
      }
    }
    else {
      delete this.pendingLoadingAnimation;
      this.view.setState('widLoading', {
        visible
      });
    }
  };

  initLoadingAnimation() {
    const handler = this.loadingAnimationHandler.bind(this);
    this.book.addEventListener('beforeAnimation', handler);
    this.book.addEventListener('afterAnimation', handler);
    this.book.addEventListener('startRendering', handler);
    this.book.addEventListener('endRendering', handler);
  }

  enableNavigation(enable) {
    this.navigationControls = enable;
  }

  setTocCtrl(tocCtrl) {
    this.tocCtrl = tocCtrl;
    this.tocCtrl.onChange = this.updateView.bind(this);
    this.tocCtrl.setActiveTab(this.actions['cmdToc'].defaultTab);
    if(this.actions['cmdToc'].active && !tocCtrl.visible) {
      tocCtrl.togle();
    }
  }

  setShareCtrl(shareCtrl) {
    this.shareCtrl = shareCtrl;
    this.shareCtrl.onChange = this.updateView.bind(this);
    this.updateView();
  }

  setPrinter(printer) {
    this.printer = printer;
    const handler = this.loadingAnimationHandler.bind(this);
    this.printer.addEventListener('loading', handler);
    this.printer.addEventListener('loaded', handler);
    this.updateView();
  }

  setSounds(sounds) {
    this.sounds = sounds;
    sounds.setEnabled(this.actions['cmdSounds'].active);
    this.updateView();
  }

  setEmbeddedInline(embeddedInline) {
    this.embeddedInline = embeddedInline;
  }


  onScreenModeChanged(e) {
    this.updateView();
  }

  canZoomIn() {
    return !this.state.smartPan || Math.abs(this.bookWatcher.scale-this.p.scale.max)>this.p.eps;
  }

  canZoomOut() {
    return !this.state.smartPan || Math.abs(this.bookWatcher.scale-this.p.scale.min)>this.p.eps;
  }

  canDefaultZoom() {
    return this.state.smartPan;
  }

  setBookZoom(scale) {
    // setTimeout(()=> {
    //   if(Math.abs(this.bookWatcher.scale-scale)<1e-3) {
        this.book.setZoom(scale, this.state.singlePage);
    //   }
    // }, 1000);
  }

  cmdAutoPlay() {
    this.state.autoPlay = !this.state.autoPlay;
    if(this.state.autoPlay) {
      this.autoPlay();
    }
    this.updateView();
  }

  autoPlay() {
    const pendingAutoPlay = Date.now();
    this.pendingAutoPlay = pendingAutoPlay;
    setTimeout(()=> {
      if(this.pendingAutoPlay===pendingAutoPlay && this.state.autoPlay) {
        if(!this.book.isProcessing()) {
          let flipped;
          if(this.p.rtl) {
            if(flipped = this.canFlipLeft()) {
              this.cmdBackward();
            }
          }
          else {
            if(flipped = this.canFlipRight()) {
              this.cmdForward();
            }
          }
          if(!flipped) {
            this._goToPage(0);
          }
        }
        this.autoPlay();
      }
    }, this.book.p.autoPlayDuration);
  }

  cmdZoomIn() {
    if(this.state.smartPan) {
      this.bookWatcher.scale = Math.min(this.p.scale.max, this.bookWatcher.scale+this.p.scale.delta);
      this.setBookZoom(this.bookWatcher.scale);
    }
    else {
      this.orbit.zoomIn(6.6*this.p.scale.delta/0.32);
    }
    this.updateView();
  }

  cmdZoomOut() {
    if(this.state.smartPan) {
      this.bookWatcher.scale = Math.max(this.p.scale.min, this.bookWatcher.scale-this.p.scale.delta);
      this.setBookZoom(this.bookWatcher.scale);
    }
    else {
      this.orbit.zoomOut(6.6*this.p.scale.delta/0.32);
    }
    this.updateView();
  }

  setScale(scale) {
    this.bookWatcher.scale = Math.min(this.p.scale.max, Math.max(this.p.scale.min, scale));
    this.setBookZoom(this.bookWatcher.scale);
    this.updateView();
  }

  cmdDefaultZoom() {
    if(this.state.smartPan) {
      this.bookWatcher.scale = this.p.scale.default;
      this.setBookZoom(this.bookWatcher.scale);
      this.updateView();
    }
  }

  cmdToc() {
    if(this.tocCtrl) {
      this.tocCtrl.togle();
    }
  }

  cmdShare() {
    if(this.shareCtrl) {
      this.shareCtrl.togle();
    }
  }

  cmdSearchBtn() {
    if(this.tocCtrl) {
      if(this.tocCtrl.visible) {
        if(this.tocCtrl.tab==='search') {
          this.tocCtrl.togle();
        }
        else {
          this.tocCtrl.cmdSearch();
        }
      }
      else {
        this.tocCtrl.togle();
        this.tocCtrl.cmdSearch();
      }
    }
  }

  cmdBackward() {
    if(!this.canFlipLeft()) return;
    if(this.state.singlePage) {
      this.state.activeSide = (this.getPage()+1)%2;
      if(this.state.activeSide) {
        this.state.activeSide = 0;
        this.updateView();
      }
      else {
        this.startFlip(this.book.flipLeft(1)).then((block)=> {
          if(block) {
            this.state.activeSide = 1;
          }
        });
      }
    }
    else {
      this.startFlip(this.book.flipLeft(1));
    }
  }

  cmdBigBackward() {
    this.cmdBackward();
  }

  cmdForward() {
    if(!this.canFlipRight()) return;
    if(this.state.singlePage) {
      this.state.activeSide = (this.getPage()+1)%2;
      if(!this.state.activeSide) {
        this.state.activeSide = 1;
        this.updateView();
      }
      else {
        this.startFlip(this.book.flipRight(1)).then((block)=> {
          if(block) {
            this.state.activeSide = 0;
          }
        });
      }
    }
    else {
      this.startFlip(this.book.flipRight(1));
    }
  }

  cmdBigForward() {
    this.cmdForward();
  }

  cmdSave() {
    const a = $('<a href="'+this.p.downloadURL+'" download target="_blank"></a>').appendTo(this.view.getContainer());
    a[0].click();
    a.remove();
  }

  cmdPrint() {
    this.printer.print();
  }

  cmdFullScreen() {
    if(!FullScreenX.activated()) {
      FullScreenX.request(this.view.getParentContainer());
    }
    else {
      FullScreenX.cancel();
    }
  }

  cmdSmartPan() {
    this.state.smartPan = !this.state.smartPan;
    if(this.state.smartPan) {
      this.orbit.minAzimuthAngle = 0;
      this.orbit.maxAzimuthAngle = 0;
      this.orbit.minPolarAngle = 0;
    	this.orbit.maxPolarAngle = Math.PI/4;
      this.bookWatcher.enabled = true;
    }
    else {
      this.orbit.minAzimuthAngle = -Infinity;
      this.orbit.maxAzimuthAngle = Infinity;
      this.orbit.minPolarAngle = 0;
    	this.orbit.maxPolarAngle = Math.PI;
      this.bookWatcher.enabled = false;
    }
    this.updateView();
  }

  isSinglePageAvailable() {
    return this.book.getRealPages()!==2 || this.book.p.singlePageMode==='half';
  }

  cmdSinglePage() {
    if(this.isSinglePageAvailable()) {
      if(this.book.p.singlePageMode==='full') {
        this.state.singlePage = !this.state.singlePage;
        this.setBookZoom(this.bookWatcher.scale);
        this.updateView();
      }
      else {
        const page = this.getPageForGUI()-1;
        this.book.togleHalfBookMode();
        this.updateView();
        this.goToPage(page);
      }
      this.dispatchAsync({
        type: 'pageMode',
        value: this.state.singlePage? 'single': 'double'
      });
    }
  }

  cmdSounds() {
    if(this.sounds) {
      this.sounds.togle();
    }
    this.updateView();
  }

  cmdStats() {
    this.state.stats = !this.state.stats;
    if(this.state.stats) {
      $(this.view.getContainer()).append(this.Stats.domElement);
      this.visual.addRenderCallback(this.binds.stats);
    }
    else {
      $(this.view.getContainer()).find(this.Stats.domElement).remove();
      this.visual.removeRenderCallback(this.binds.stats);
    }
    this.updateView();
  }

  cmdPendingPlay() {
    this.book.resolvePendingPlayers();
  }

  cmdGotoFirstPage() {
    this._goToPage(0);
  }

  cmdGotoLastPage() {
    this._goToPage(this.book.getPages()-1);
  }

  goToPage(page) {
    return this._goToPage(this.book.isHalfBookMode()? page*2: page);
  }

  _goToPage(page) {
    page = Math.max(Math.min(page, this.book.getPages()-1),0);
    if(this.p.rtl) {
      page = this.book.getBookPages()-1-page;
    }
    const pageNum = Math.max(Math.min(page, this.book.getBookPages()-1),0);
    this.state.activeSide = (pageNum+1)%2;
    let target = Math.max(Math.min(page-1+page%2, this.book.getBookPages()-1),0), current = this.book.getPage(), flips = [], covs = 0;;
    if(target!=current) {
      if(current===0) {
        flips.push(1);
        current+=1;
        ++covs;
      }
      else if(current===this.book.getBookPages()-1) {
        flips.push(-1);
        current-=2;
        ++covs;
      }
      let cv = 0;
      if(target===0) {
        cv = -1;
        target+=1;
        ++covs;
      }
      else if(target===this.book.getBookPages()-1) {
        cv = 1;
        target-=2;
        ++covs;
      }
      if(target-current) {
        flips.push(Math.ceil((target-current)/2));
      }
      if(cv) {
        flips.push(cv);
      }
    }

    const setClb = (fl, time, clb)=> {
      return new Promise((resolve)=> {
        setTimeout(()=> {
          if(fl<0) {
            this.startFlip(this.book.flipLeft(-fl, clb));
          }
          else {
            this.startFlip(this.book.flipRight(fl, clb));
          }
          resolve();
        }, time);
      });
    };

    if(covs===2) {
      setClb(flips[0], 0, (block, progress, state)=> {
        if(state=='finish' && progress==1) {
          setClb(flips[flips.length-1], 0);
        }
      }).then(()=> setClb(flips[1], 400));
    }
    else {
      let next = Promise.resolve(), time = 0;
      for(let fl of flips) {
        const t = time;
        next = next.then(()=> setClb(fl, t));
        time = 400;
      }
    }
  }

  startFlip(flipRes) {
    return flipRes? flipRes.then((block)=> {
      if(block) {
        this.dispatchAsync({
          type: 'startFlip'
        });
      }
      return block;
    }): Promise.resolve(undefined);
  }

  endFlip(block) {
    this.dispatchAsync({
      type: 'endFlip'
    });
    return block;
  }

  getPage() {
    const page = this.book.getPage();
    return page? Math.min(this.book.getPage()+this.state.activeSide, this.book.getBookPages()-1): 0;
  }

  getPageForGUI() {
    let n = (this.state.singlePage? this.getPage(): this.book.getPage())+1;
    if(this.p.rtl) {
      n = this.book.getBookPages()-n+1;
    }
    if(n>this.book.getPages()) {
      n = this.book.getPages();
    }
    return this.book.isHalfBookMode()? (this.p.rtl? (n+1)/2: (n-n%2)/2+1): n;
  }

  inpPage(e, data) {
    this.goToPage(data-1);
  }

  updateViewIfState(block, progress, state, type) {
    if(state==='init' || state==='finish') {
      setTimeout(this.updateView.bind(this), 100);
    }
    if(state==='finish') {
      this.endFlip(block);
    }
  }

  isCmdVisible(name) {
    return $(this.visual.element).width()<this.p.narrowView.width? (this.actions[name].enabledInNarrow===undefined? this.actions[name].enabled: this.actions[name].enabledInNarrow): this.actions[name].enabled;
  }

  updateViewState() {
    this.viewState = {
      'cmdZoomIn': {
        enable: this.canZoomIn(),
        visible: this.isCmdVisible('cmdZoomIn'),
        active: false
      },
      'cmdZoomOut': {
        enable: this.canZoomOut(),
        visible: this.isCmdVisible('cmdZoomOut'),
        active: false
      },
      'cmdDefaultZoom': {
        enable: this.canDefaultZoom(),
        visible: this.isCmdVisible('cmdDefaultZoom'),
        active: this.canDefaultZoom() && Math.abs(this.bookWatcher.scale-this.p.scale.default)<this.p.eps
      },
      'cmdToc': {
        enable: !!this.tocCtrl,
        visible: this.isCmdVisible('cmdToc') && this.tocCtrl,
        active: this.tocCtrl && this.tocCtrl.visible
      },
      'cmdShare': {
        enable: !!this.shareCtrl,
        visible: this.isCmdVisible('cmdShare') && this.shareCtrl,
        active: this.shareCtrl && this.shareCtrl.visible
      },
      'cmdSearchBtn': {
        enable: !!this.tocCtrl,
        visible: this.isCmdVisible('cmdSearchBtn') && this.tocCtrl && this.tocCtrl.search,
        active: this.tocCtrl && this.tocCtrl.visible && this.tocCtrl.tab==='search'
      },
      'inpPages': {
        visible: true,
        value: this.book.getRealPages()
      },
      'inpPage': {
        visible: true,
        enable: !this.book.isProcessing() && this.navigationControls,
        value: this.getPageForGUI()
      },
      'cmdSave': {
        enable: true,
        visible: this.isCmdVisible('cmdSave') && !!this.p.downloadURL,
        active: false
      },
      'cmdPrint': {
        enable: true,
        visible: this.isCmdVisible('cmdPrint') && !!this.printer,
        active: false
      },
      'cmdFullScreen': {
        enable: FullScreenX.available(),
        visible: this.isCmdVisible('cmdFullScreen'),
        active: FullScreenX.available() && FullScreenX.activated()
      },
      'widControls': {
        enable: true,
        visible: true,
        active: false
      },
      'widSettings': {
        enable: true,
        visible: this.isCmdVisible('widSettings'),
        active: false
      },
      'widToolbar': {
        enable: true,
        visible: this.isCmdVisible('widToolbar'),
        active: false
      },
      'cmdSmartPan': {
        enable: true,
        visible: this.isCmdVisible('cmdSmartPan'),
        active: this.state.smartPan
      },
      'cmdSinglePage': {
        enable: this.isSinglePageAvailable(),
        visible: this.isCmdVisible('cmdSinglePage'),
        active: this.state.singlePage || this.book.isHalfBookMode()
      },
      'cmdSounds': {
        enable: true,
        visible:  this.isCmdVisible('cmdSounds') && !!this.sounds,
        active: !!this.sounds && this.sounds.enabled
      },
      'cmdStats': {
        enable: true,
        visible: this.isCmdVisible('cmdStats'),
        active: this.state.stats
      },
      'cmdAutoPlay': {
        enable: true,
        visible: this.isCmdVisible('cmdAutoPlay'),
        active: this.state.autoPlay
      },
      'cmdPendingPlay': {
        enable: true,
        visible: true,
        active: false
      },
      'widPendingPlay': {
        enable: true,
        visible: this.book.hasPendingPlayers(),
        active: false
      },
    };

    const left = this.canFlipLeft(),
          right = this.canFlipRight();
    const flippersEnable = {
      cmdBackward: left,
      cmdBigBackward: left,
      cmdForward: right,
      cmdBigForward: right,
      cmdGotoFirstPage: left,
      cmdGotoLastPage: right
    };
    for(let name of Object.keys(flippersEnable)) {
      this.viewState[name] = {
        enable: flippersEnable[name],
        visible: this.isCmdVisible(name),
        active: false
      };
    };
  }

  canFlipLeft() {
    return this.navigationControls && (!!this.book.getLeftFlipping() || this.state.singlePage && this.p.rtl && this.getPage()===2);
  }

  canFlipRight() {
    return this.navigationControls && (!!this.book.getRightFlipping() || this.state.singlePage && !this.p.rtl && this.getPage()===this.book.getPages()-2);
  }

  updateView() {
    if(this.view) {
      this.updateViewState();
      for(let name of Object.keys(this.viewState)) {
        this.view.setState(name, this.viewState[name]);
      }
      this.view.setViewClases(this.bookWatcher.scale, this.isCmdVisible('widToolbar'));
    }
  }

  getActions() {
    const isSwipping = (name)=> {
      return this.actions.touchCmdSwipe.enabled && this.actions.touchCmdSwipe.code===this.actions[name].code && this.state.smartPan && this.bookWatcher.scale<=1;
    }, cmds = {};

    for(let name in this) {
      if(name.indexOf('cmd')===0) {
        cmds[name] = {
          activate: (...args)=> {
            if(this.viewState && this.viewState[name].enable) {
              this[name](...args);
            }
          }
        };
      }
    }

    return {
      ...cmds,
      cmdPanLeft: {
        activate: (e)=> this.orbit.actions.pan(e, {
          state: 'move',
          dx: -this.p.pan.speed,
          dy: 0
        })
      },
      cmdPanRight: {
        activate: (e)=> this.orbit.actions.pan(e, {
          state: 'move',
          dx: this.p.pan.speed,
          dy: 0
        })
      },
      cmdPanUp: {
        activate: (e)=> this.orbit.actions.pan(e, {
          state: 'move',
          dx: 0,
          dy: -this.p.pan.speed
        })
      },
      cmdPanDown: {
        activate: (e)=> this.orbit.actions.pan(e, {
          state: 'move',
          dx: 0,
          dy: this.p.pan.speed
        })
      },
      mouseCmdRotate: {
        activate: this.orbit.actions.rotate
      },
      mouseCmdDragZoom: {
        activate: (e, data)=> {
          if(data.dy>0) {
            this.cmdZoomOut();
          }
          else if(data.dy<0) {
            this.cmdZoomIn();
          }
        }
      },
      mouseCmdPan: {
        activate: this.orbit.actions.pan
      },
      mouseCmdWheelZoom: {
        activate: (e)=> {
          const scale = this.bookWatcher.scale;
          if(!this.embeddedInline || FullScreenX.available() && FullScreenX.activated()) {
            if(e.deltaY<0) {
              this.cmdZoomOut();
            }
            else if(e.deltaY>0) {
              this.cmdZoomIn();
            }
          }
          if(!this.state.smartPan || Math.abs(this.bookWatcher.scale-scale)>1e-4) {
            e.preventDefault();
          }
        }
      },
      touchCmdRotate: {
        activate: (e, data)=> {
          if(!isSwipping('touchCmdRotate')) {
            if(data.state==='move') {
              e.preventDefault();
            }
            this.orbit.actions.rotate(e, data);
          }
        }
      },
      touchCmdZoom: {
        activate: (e, data)=> {
          if(!isSwipping('touchCmdZoom')) {
            const l = function(v) {
              return Math.sqrt(v.x*v.x+v.y*v.y);
            };
            if(data.state==='start') {
              this.touchZoomData = {
                l: l(data),
                scale: this.bookWatcher.scale
              };
            }
            else if(data.state==='move') {
              e.preventDefault();
              this.setScale(l(data)/this.touchZoomData.l*this.touchZoomData.scale);
            }
          }
        }
      },
      touchCmdPan: {
        activate: (e, data)=> {
          if(!isSwipping('touchCmdPan')) {
            if(data.state==='move' && (!this.state.smartPan || this.bookWatcher.scale>1)) {
              e.preventDefault();
              this.orbit.actions.pan(e, data);
            }
          }
        }
      },
      touchCmdSwipe: {
        activate: (e, data)=> {
          if(isSwipping('touchCmdSwipe')) {
            if(data.state==='start') {
              const touch = (e.touches || e.originalEvent.touches)[this.actions.touchCmdSwipe.code-1];
              this.swipeData = {
                handled: false,
                x0: touch.pageX,
                y0: touch.pageY,
                x: touch.pageX,
                y: touch.pageY
              };
            }
            else if(data.state==='move') {
              // e.preventDefault();
              if(!this.swipeData.handled) {
                this.swipeData = {
                  ...this.swipeData,
                  x: this.swipeData.x+data.dx,
                  y: this.swipeData.y+data.dy
                }
                if(Math.abs(this.swipeData.x0-this.swipeData.x)>100) {
                  this.swipeData.x0>this.swipeData.x? this.cmdForward(): this.cmdBackward();
                  this.swipeData.handled = true;
                }
              }
            }
            else {
              delete this.swipeData;
            }
          }
        }
      },
      widSettings: {
        activate: ()=> undefined
      },
      widToolbar: {
        activate: ()=> undefined
      }
    };
  }

  bindActions() {
    this.eToA = new EventsToActions($(this.visual.element));
    this.eToA.addAction((e)=> e.preventDefault(), 'contextmenu', EventsToActions.mouseButtons.Right, 0);
    this.eToA.addAction((e)=> $(this.view.getParentContainer()).trigger(e), 'keydown', 27, 0);

    this.actions = this.getActions();
    for(let name of Object.keys(this.actions)) {
      const action = {
        ...this.actions[name],
        ...this.p.actions[name]
      };
      this.actions[name] = action;
      if(name.indexOf('mouseCmd')!==0 && name.indexOf('touchCmd')!==0 || action.enabled) {
        const flags = action.flags || 0;
        if(action.type) {
          this.eToA.addAction(action.activate, action.type, action.code, flags);
        }
        else if(action.code!==undefined) {
          this.eToA.addAction(action.activate, 'keydown', action.code, flags);
        }
      }
    }
  }

  static prepareProps(props) {
    return BookController.calcProps(BookController.mergeProps(bookControllerProps(), props));
  }

  static setActions(props, actions) {
    for(let name of Object.keys(actions || {})) {
      props.actions[name] = {
        ...props.actions[name],
        ...actions[name]
      };
    }
  }

  static mergeProps(first, second) {
    second = second || {};
    function merge(first, second) {
      second = second || {};
      const props = {
        ...first,
        ...second
      };
      for(let name of Object.keys(first)) {
        if(typeof first[name]==='object') {
          props[name] = merge(first[name], second[name]);
        }
      }
      return props;
    }
    const props = merge(first, second);
    BookController.setActions(props, first.actions);
    BookController.setActions(props, second.actions);
    return props;
  }

  static calcProps(props) {
    props.scale.delta = (props.scale.max-props.scale.min)/props.scale.levels;
    return props;
  }

}
