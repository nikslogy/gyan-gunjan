const mouseButtons = {
  Left: 0,
  Middle: 1,
  Right: 2
};

export function props() {
  return {
    eps: 1e-4,
    scale: {
      default: 0.9,
      min: 0.9,
      max: 2,
      levels: 5
    },
    pan: {
      speed: 50
    },
    loadingAnimation: {
      skin: true,
      book: false
    },
    autoResolution: {
      enabled: true,
      coefficient: 1.5,
      min: 800,
      max: 1920
    },
    narrowView: {
      width: 500
    },
    actions: {
      cmdZoomIn: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdZoomOut: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdDefaultZoom: {
        enabled: false,
        enabledInNarrow: false,
        type: 'dblclick',
        code: 0
      },
      cmdToc: {
        enabled: true,
        enabledInNarrow: true,
        active: false,
        defaultTab: 'bookmarks'
      },
      cmdAutoPlay: {
        enabled: false,
        enabledInNarrow: false,
        active: false
      },
      cmdBackward: {
        enabled: true,
        enabledInNarrow: false,
        code: 37
      },
      cmdBigBackward: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdForward: {
        enabled: true,
        enabledInNarrow: false,
        code: 39
      },
      cmdBigForward: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdSave: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdPrint: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdFullScreen: {
        enabled: true,
        enabledInNarrow: true
      },
      widSettings: {
        enabled: true,
        enabledInNarrow: true
      },
      widToolbar: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdSmartPan: {
        enabled: false,
        enabledInNarrow: false,
        active: true,
      },
      cmdSinglePage: {
        enabled: true,
        enabledInNarrow: true,
        active: false,
        activeForMobile: true
      },
      cmdSounds: {
        enabled: true,
        enabledInNarrow: true,
        active: true
      },
      cmdStats: {
        enabled: false,
        enabledInNarrow: false,
        active: false
      },
      cmdGotoFirstPage: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdGotoLastPage: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdShare: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdSearchBtn: {
        enabled: true,
        enabledInNarrow: true
      },
      cmdPanLeft: {
        enabled: false
      },
      cmdPanRight: {
        enabled: false
      },
      cmdPanUp: {
        enabled: false
      },
      cmdPanDown: {
        enabled: false
      },
      mouseCmdRotate: {
        enabled: true,
        type: 'mousedrag',
        code: mouseButtons.Right
      },
      mouseCmdDragZoom: {
        enabled: true,
        type: 'mousedrag',
        code: mouseButtons.Middle
      },
      mouseCmdPan: {
        enabled: true,
        type: 'mousedrag',
        code: mouseButtons.Left
      },
      mouseCmdWheelZoom: {
        enabled: true,
        type: 'mousewheel',
        code: 0
      },
      touchCmdRotate: {
        enabled: true,
        type: 'touchdrag',
        code: 3
      },
      touchCmdZoom: {
        enabled: true,
        type: 'touchdrag',
        code: 2
      },
      touchCmdPan: {
        enabled: true,
        type: 'touchdrag',
        code: 1
      },
      touchCmdSwipe: {
        enabled: true,
        type: 'touchdrag',
        code: 1
      }
    }
  };
};
