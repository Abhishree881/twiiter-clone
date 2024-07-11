const intialState = {
    users: [],
  };
  
  const userReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case 'GET_USERS':
        return {
         ...state,
          users: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;