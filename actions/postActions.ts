import axios from 'axios'
import { toast } from "react-hot-toast";

export const getPosts = () => {
  return (dispatch: any) => {
    dispatch({type: 'LOADING', payload: true})
    axios.get('/api/posts').then((res: any) => {
      dispatch({
        type: 'GET_POSTS',
        payload: res.data,
      })
      dispatch({type: 'LOADING', payload: false})
    })
  }
}

export const getUserPosts = (userId: string) => {
  return (dispatch: any) => {
    dispatch({
      type: 'GET_USER_POSTS',
      payload: [],
    })
    dispatch({type: 'LOADING', payload: true})
    axios.get(`/api/posts?userId=${userId}`).then((res: any) => {
      dispatch({
        type: 'GET_USER_POSTS',
        payload: res.data,
      })
      dispatch({type: 'LOADING', payload: false})
    })
  }
}

export const refreshPost = () => {
  return (dispatch: any) => {
    axios.get('/api/posts').then((res: any) => {
      dispatch({
        type: 'REFRESH_POSTS',
        payload: res.data,
      })
    })
  }
}

export const createPost = (isComment: any, body: any, image: any, postId: any) => {
  return (dispatch: any) => {
    dispatch({type:'POSTING', payload: null})
    const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';
    axios.post(url, { body, image }).then(() => {
      toast.success("Tweet created")
      dispatch({type:'POSTING', payload: true})
      dispatch(refreshPost());
    }).catch((err: any) => {
      console.log(err);
      dispatch({type:'POSTING', payload: true})
      toast.error('Something went wrong');
    })
    dispatch({type:'POSTING', payload: null})
  }
}

export const getPost = (postId: string) => {
  return (dispatch: any) => {
    axios.get('/api/posts/' + postId).then((res: any) => {
      dispatch({
        type: 'GET_POST',
        payload: res.data,
      })
    })
  }
}

export const clearPost = () =>{
  return (dispatch: any) =>{
    dispatch({
        type: 'GET_POST',
        payload: [],
    })
  }
}
