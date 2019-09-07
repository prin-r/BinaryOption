import React, { createContext, useContext, useReducer } from 'react'
import { UserStateTemplate, UserReducer } from '../reducers/UserReducer'

const UserContext = React.createContext()

export const UserProvider = ({
  reducer = UserReducer,
  initialState = UserStateTemplate,
  children,
}) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
)
export const useUserContextState = () => useContext(UserContext)
