const menuList = [
  {
    authName: '用户管理',
    id: 0,
    children: [
      {
        childName: '管理员列表',
        id: 10,
        path: 'admins'
      },
      {
        childName: '玩家列表',
        id: 11,
        path: 'users'
      }
    ]
  },
  {
    authName: '模板管理',
    id: 2,
    children: [
      {
        childName: '模板分类',
        id: 30,
        path: 'moduleList'
      }
    ]
  },
  {
    authName: '故事管理',
    id: 3,
    children: [
      {
        childName: '故事列表',
        id: 40,
        path: 'storyList'
      }
    ]
  }
]

module.exports = {
  menuList: menuList
}
