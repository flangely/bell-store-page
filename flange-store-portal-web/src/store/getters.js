const getters = {
    device: state => state.app.device,
    token: state => state.user.token,
    name: state => state.user.name,
    memberId: state => state.user.memberId
  }
export default getters