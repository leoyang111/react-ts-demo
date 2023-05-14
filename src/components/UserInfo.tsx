import React from 'react'
import {Link} from 'react-router-dom'
import {LOGIN_PATHNAME} from '../router/index'
export default function UserInfo() {
  return (
    <>
    <Link to={LOGIN_PATHNAME}>登陆 </Link>
    </>
  )
}
