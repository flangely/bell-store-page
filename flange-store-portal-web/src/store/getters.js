const getters = {
    device: state => state.app.device,
    token: state => state.user.token,
    name: state => state.user.name,
    keyword: state => state.user.keyword
  }
export default getters