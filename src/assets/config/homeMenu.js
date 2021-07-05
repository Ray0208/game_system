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
    authName: '权限管理',
    id: 1,
    children: [
      {
        childName: '权限列表',
        id: 20,
        path: 'powers'
      }
    ]
  },
  {
    authName: '模板管理',
    id: 2,
    children: [
      {
        childName: '模板类型',
        id: 30,
        path: 'moduleStyles'
      },
      {
        childName: '模板列表',
        id: 31,
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
