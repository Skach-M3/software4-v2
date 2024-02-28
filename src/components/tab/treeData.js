export const treeData = [{
  id: '1',
  label: '糖尿病',
  isLeafs: false,
  isCommon: false,
  path: '糖尿病',
  children: [{
    id: '1-1',
    label: '一型糖尿病',
    isLeafs: false,
    isCommon: false,
    path: '糖尿病/一型糖尿病',
    children: [{
      id: '1-1-1',
      label: '数据集1',
      isLeafs: true,
    }, {
      id: '1-1-2',
      label: '数据集2',
      isLeafs: true,
    }, {
      id: '1-1-3',
      label: '数据集3',
      isLeafs: true,
    }, {
      id: '1-1-4',
      label: '数据集4',
      isLeafs: true,
    }]
  }, {
    id: '1-2',
    label: '二型糖尿病',
    isLeafs: false,
    isCommon: false,
    path: '糖尿病/二型糖尿病',
    children: [{
      id: '1-2-1',
      label: '数据集1',
      isLeafs: true,
    }, {
      id: '1-2-2',
      label: '数据集2',
      isLeafs: true,
    }, {
      id: '1-2-3',
      label: '数据集3',
      isLeafs: true,
    }]
  }]
},
  {
    id: '2',
    label: '肺病',
    isLeafs: false,
    isCommon: false,
    path: '肺病',
    children: [{
      id: '2-1',
      label: 'xxx肺病',
      isLeafs: false,
      isCommon: false,
      path: '肺病/xxx肺病',
      children: [{
        id: '2-1-1',
        label: '数据集1',
        isLeafs: true,
      }, {
        id: '2-1-2',
        label: '数据集2',
        isLeafs: true,
      }, {
        id: '2-1-3',
        label: '数据集3',
        isLeafs: true,
      }, {
        id: '2-1-4',
        label: '数据集4',
        isLeafs: true,
      }]
    }, {
      id: '2-2',
      label: 'xx肺病',
      isLeafs: false,
      isCommon: false,
      path: '肺病/xx肺病',
      children: [{
        id: '2-2-1',
        label: '数据集1',
        isLeafs: true,
      }, {
        id: '2-2-2',
        label: '数据集2',
        isLeafs: true,
      }, {
        id: '2-2-3',
        label: '数据集3',
        isLeafs: true,
      }]
    }]
  },
  {
    id: '3',
    label: '公共数据集',
    isLeafs: false,
    isCommon: true,
    path: '公共数据集',
    children: [{
      id: '3-1',
      label: 'xxx肺病',
      isLeafs: false,
      isCommon: true,
      path: '公共数据集/xxx肺病',
      children: [{
        id: '3-1-1',
        label: '数据集1',
        isLeafs: true,
      }]
    }, {
      id: '3-2',
      label: 'xx肺病',
      isLeafs: false,
      isCommon: true,
      path: '公共数据集/xx肺病',
      children: [{
        id: '3-2-1',
        label: '数据集1',
        isLeafs: true,
      }, {
        id: '3-2-2',
        label: '数据集2',
        isLeafs: true,
      }]
    }]
  }];