const moduleStyle = [
  {
    id: 1,
    content: '时间',
    children: [
      {
        id: 11,
        content: '清朝',
        partent_id: 1
      },
      {
        id: 12,
        content: '现代',
        partent_id: 1
      },
      {
        id: 13,
        content: '未来',
        partent_id: 1
      }
    ]
  },
  {
    id: 2,
    content: '地点',
    children: [
      {
        id: 21,
        content: '埃及',
        partent_id: 2
      },
      {
        id: 22,
        content: '日本',
        partent_id: 2
      },
      {
        id: 23,
        content: '海洋',
        partent_id: 2
      }
    ]
  },
  {
    id: 3,
    content: '人物',
    children: [
      {
        id: 31,
        content: '葫芦娃',
        partent_id: 3
      },
      {
        id: 32,
        content: '变形金刚',
        partent_id: 3
      },
      {
        id: 33,
        content: '爷爷',
        partent_id: 3
      }
    ]
  },
  {
    id: 4,
    content: '天气',
    children: [
      {
        id: 41,
        content: '阳光明媚',
        partent_id: 4
      },
      {
        id: 42,
        content: '暴雨',
        partent_id: 4
      },
      {
        id: 43,
        content: '冰雹',
        partent_id: 4
      }
    ]
  }
]

const keyWordTotal = 3

module.exports = {
  moduleStyle: moduleStyle,
  keyWordTotal: keyWordTotal
}
