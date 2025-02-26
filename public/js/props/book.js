
export function props(style = 'volume') {
  // const props = {
  //   height,
  //   width,
  //   gravity,
  //   injector,
  //   cachedPages,
  //   renderInactivePages,
  //   renderWhileFlipping,
  //   pagesForPredicting,
  //   preloadPages,
  //   sheet: {
  //     startVelocity,
  //     cornerDeviation,
  //     flexibility,
  //     flexibleCorner,
  //     bending,
  //     wave,
  //     shape,
  //     widthTexels,
  //     heightTexels,
  //     color,
  //     sideTexture
  //   },
  //   cover: {
  //     ...sheet,
  //     padding,
  //     binderTexture,
  //     depth,
  //     mass
  //   },
  //   page: {
  //     ...sheet,
  //     depth,
  //     mass
  //   }
  // };

  const def = {
    height: 0.297,
    width: 0.21,
    backgroundColor: '',
    backgroundImage: '',
    backgroundStyle: '',
    highlightLinks: true,
    lighting: 'mixed',
    singlePageMode: 'full',
    gravity: 1,
    cachedPages: 50,
    renderInactivePages: true,
    renderInactivePagesOnMobile: true,
    renderWhileFlipping: false,
    pagesForPredicting: 5,
    preloadPages: 5,
    autoPlayDuration: 5000,
    rtl: false,
    interactiveCorners: true,
    maxDepth: 0.008,
    sheet: {
      startVelocity: 1.2,
      cornerDeviation: 0.15,
      flexibility: 10,
      flexibleCorner: 0.5,
      bending: 11,
      wave: 0.3,
      shape: 0,
      widthTexels: 1920,
      heightTexels: 1080,
      color: 0xFFFFFF,
      side: 'color',
      stretchImages: true
    },
    cover: {
      side: 'transparent',
      binderTexture: '',
      depth: 0.0003,
      padding: 0,
      mass: 0.001
    },
    page: {
      depth: 0.0001,
      mass: 0.001
    },
    cssLayerProps: {
      width: 1024
    }
  },
  styles = {
    volume: def,
    flat: {
      ...def,
      lighting: 'ambient',
      sheet: {
        ...def.sheet,
        wave: 0.05,
        side: 'transparent',
        shape: 1
      },
      cover: {
        ...def.cover,
        depth: 0.00002
      },
      page: {
        ...def.page,
        depth: 0.00001
      }
    },
    'volume-paddings': {
      ...def,
      cover: {
        ...def.cover,
        padding: 0.0025
      }
    }
  };
  styles['volume-unrolling'] = {
    ...styles.volume,
    sheet: {
      ...styles.volume.sheet,
      shape: 1
    }
  };
  styles['volume-paddings-unrolling'] = {
    ...styles['volume-paddings'],
    sheet: {
      ...styles['volume-paddings'].sheet,
      shape: 1
    }
  };
  return styles[style] || def;
};
