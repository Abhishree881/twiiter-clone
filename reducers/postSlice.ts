const intialState = {
  posts: [],
  userPosts: [],
  post: {},
  comments: [],
  comment: {},
  loading: false,
  firstLoad: true,
  posting: null,
};

const postReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
       ...state,
        posts: action.payload,
        firstLoad: false,
      };
    case 'REFRESH_POSTS':
        return {
         ...state,
          posts: action.payload,
        };
    case 'GET_USER_POSTS':
      return {
        ...state,
        userPosts: action.payload,
      };
    case 'GET_POST':
      return {
       ...state,
        post: action.payload,
      };
    case 'GET_COMMENTS':
      return {
       ...state,
        comments: action.payload,
      };
    case 'GET_COMMENT':
      return {
       ...state,
        comment: action.payload,
      };
    case 'LOADING':
        return {
         ...state,
          loading: action.payload,
        };
    case 'POSTING':
      return {
       ...state,
        posting: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;