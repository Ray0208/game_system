const total = 4

const admins = [
  {
    id: '1',
    name: 'admin1',
    password: '111111',
    email: '123456@qq.com',
    role: '超级管理员',
    state: true
  },
  {
    id: '2',
    name: 'admin2',
    password: '222222',
    email: '123456@qq.com',
    role: '普通管理员',
    state: false
  },
  {
    id: '3',
    name: 'admin3',
    password: '333333',
    email: '123456@qq.com',
    role: '普通管理员',
    state: true
  },
  {
    id: '4',
    name: 'admin4',
    password: '444444',
    email: '123456@qq.com',
    role: '普通管理员',
    state: true
  }
]

module.exports = {
  total: total,
  admins: admins
}
