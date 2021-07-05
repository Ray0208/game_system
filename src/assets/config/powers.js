const powers = [
  {
    id: 1,
    powerName: '管理员管理',
    path: '/admins',
    powerLevel: 1
  },
  {
    id: 2,
    powerName: '玩家管理',
    path: '/users',
    powerLevel: 2
  },
  {
    id: 3,
    powerName: '权限管理',
    path: '/powers',
    powerLevel: 1
  },
  {
    id: 4,
    powerName: '添加模板',
    path: '/modelList',
    powerLevel: 3
  },
  {
    id: 5,
    powerName: '添加模板类型',
    path: '/modelStyle',
    powerLevel: 3
  }
]

const total = 5

module.exports = {
  powers: powers,
  total: total
}
