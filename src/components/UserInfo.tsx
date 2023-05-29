import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router/index'
import { getUserInfoService } from '../services/user'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Button ,message} from 'antd'
import {removeToke} from '../utils/user-token'

export default function UserInfo() {
  const { data } = useRequest(getUserInfoService)
  const { username, nickname } = data || {}
  const nav=useNavigate()
  const logoout=()=>{
    removeToke()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logoout} >退出</Button>
    </>
  )
  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登陆 </Link>
    </>
  )
  return <div>{username ? UserInfo : Login}</div>
}
