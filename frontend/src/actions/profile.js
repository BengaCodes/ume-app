import {setAlert} from './alert'
import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types'
import { getUserProfile, createProfile } from '../lib/api'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await getUserProfile()

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Create or update a profile
export const createUserProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const res = await createProfile(formData)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))

    if (!edit) {
      history.push('/dashboard')
    }
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}