export default [{
    key: 1,
    name: '一级 1',
    data: {
        name: '1'
    },
    children: [{
        key: 4,
        name: '二级 1-1',
        data: {
            name: '4'
        },
        children: [{
            key: 9,
            data: {
                name: '9'
            },
            name: '三级 1-1-1'
        }, {
            key: 10,
            data: {
                name: '10'
            },
            name: '三级 1-1-2'
        }]
    }]
}, {
    key: 2,
    name: '一级 2',
    data: {
        name: '2'
    },
    children: [{
        key: 5,
        data: {
            name: '5'
        },
        name: '二级 2-1'
    }, {
        key: 6,
        data: {
            name: '6'
        },
        name: '二级 2-2'
    }]
}, {
    key: 3,
    name: '一级 3',
    data: {
        name: '3'
    },
    children: [{
        key: 7,
        data: {
            name: '7'
        },
        name: '二级 3-1'
    }, {
        key: 8,
        data: {
            name: '8'
        },
        name: '二级 3-2'
    }]
}]
