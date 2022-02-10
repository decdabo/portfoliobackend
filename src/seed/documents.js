const role = [
  {
    name: "admin",
    permissions: [process.env.ADMIN_KEY]
  },
  {
    name: "user",
    permissions: [process.env.USER_KEY]
  }
]

module.exports = role;
