const ADD_HISTORY = 'ADD_HISTORY'

export const addhistory = (order,id) => ({
  type: ADD_HISTORY,
  id: id,
  order: order
})

const history = (state = {}, action) => {
  switch(action.type) {
    case ADD_HISTORY:
      return {
        ...state,
        [action.id]: action.order
      }
    default:
      return state
  }
}
export default history
