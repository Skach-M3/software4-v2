export const treeData = [{
    id: '1',
    label: '糖尿病',
    isLeafs: false,
    children: [{
      id: '1-1',
      label: '一型糖尿病',
      isLeafs: true,
      children: []
    }, {
      id: '1-2',
      label: '二型糖尿病',
      isLeafs: true,
      children: []
    }]
  },
  {
    id: '2',
    label: '肺病',
    isLeafs: false,
    children: [{
      id: '2-1',
      label: 'xxx肺病',
      isLeafs: true,
      children: []
    }, {
      id: '2-2',
      label: 'xx肺病',
      isLeafs: true,
      children: []
    }]
  },
  {
    id: '4',
    label: '心脏病',
    isLeafs: false,
    children: [{
      id: '4-1',
      label: '心脏病',
      isLeafs: true,
      children: []
    }]
  },
  {
    id: '3',
    label: '其他',
    isLeafs: false,
    children: [{
      id: '3-1',
      label: '公共数据集1',
      isLeafs: true,
      children: []
    }, {
      id: '3-2',
      label: '公共数据集2',
      isLeafs: true,
      children: []
    }]
  }];

  export const treeDataDialog = [
    {
      id: '1',
      label: '诊断',
      children: [{
        id: '1-1',
        label: '问诊',
        children: []
      }, {
        id: '1-2',
        label: '专家会诊',
        children: []
      }]
    }, {
      id: '2',
      label: '手术记录',
      children: []
    }, {
      id: '3',
      label: '检验',
      children: [{
        id: '3-1',
        label: '血糖',
        children: []
      }, {
        id: '3-2',
        label: '血压',
        children: []
      }]
    }];