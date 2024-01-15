export const featureSelectTree = [
    {
        id: "1",
        label: "生理指标",
        isLeaf:false,
        children: [
            {
                id: "1-1",
                label: "血糖",
                fill_rate: 0.98, //填充率
                status: 0,//0:未选中，1:选为因变量，2:选为自变量
                showTag: false,
                isLeaf:true
            },
            {
                id: "1-2",
                label: "血压",
                fill_rate: 0.45,
                status: 0,
                showTag: false,
                isLeaf:true
            },
            {
                id: "1-3",
                label: "胆固醇",
                fill_rate: 0.25,
                status: 0,
                showTag: false,
                isLeaf:true
            },
        ]
    },
    {
        id: '2',
        label: '检查指标',
        isLeaf:false,
        children: [{
            id: '2-1',
            label: '血检',
            fill_rate: 0.8,
            status: 0,
            showTag: false,
            isLeaf:true
        }, {
            id: '2-2',
            label: '尿检',
            fill_rate: 0.81,
            status: 0,
            showTag: false,
            isLeaf:true
        }, {
            id: '2-3',
            label: '体检',
            fill_rate: 0.60,
            status: 0,
            showTag: false,
            isLeaf:true
        },
        {
            id: '2-4',
            label: '心电图',
            fill_rate: 1,
            status: 0,
            showTag: false,
            isLeaf:true
        }, {
            id: '2-5',
            label: 'B超',
            fill_rate: 0.89,
            status: 0,
            showTag: false,
            isLeaf:true
        }, {
            id: '2-6',
            label: 'CT',
            fill_rate: 0.75,
            status: 0,
            showTag: false,
            isLeaf:true
        }, {
            id: '2-7',
            label: 'MRI',
            fill_rate: 0.65,
            status: 0,
            showTag: false,
            isLeaf:true
        }, {
            id: '2-8',
            label: 'PET-CT',
            fill_rate: 0.98,
            status: 0,
            showTag: false,
            isLeaf:true
        }]
    }]

