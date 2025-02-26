import SheetBlock from './SheetBlock';

export default class Cover extends SheetBlock {

  constructor(visual, p, angle, state) {
    super(visual, p, 0, 1, angle, state);
  }

  getProps() {
    return {
      ...this.p.cover,
      sheets: 1
    };
  }

  loadPoints() {
    const openedInterpolationIndeces = [
      {
        left: [2,3,4],
        right: [2,3,4]
      }
    ],
    closedInterpolationIndeces = [
      [0,1,2]
    ],
    interpolationPoints = [
      {
        x: [
             [0,0.2877,0.6347,0.8174,1.0000],
             [0,0.2831,0.6256,0.8082,0.9909],
             [0,0.2603,0.5936,0.7763,0.9589],
             [0,0.1370,0.3881,0.5342,0.6758],
             [0,0,0,0,0]
        ],
        y: [
             [0,0,0,0,0],
             [0,0.02,0.005,-0.001,-0.0025],
             [0,0.04,0.01,-0.002,-0.005],
             [0, 0.2466, 0.4795, 0.5708, 0.6758],
             [0, 0.2877, 0.6347, 0.8174, 1.0000]
        ]
      }
    ];
    return {
      interpolationPoints,
      openedInterpolationIndeces,
      closedInterpolationIndeces
    };
  }
}
