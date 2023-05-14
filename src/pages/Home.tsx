import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button,Typography } from 'antd'
import {MANAGE_INDEX_PATHNAME} from '../router/index'
import styles from './Home.module.scss'
const {Title,Paragraph} =Typography
const Home: FC = () => {
  //第三方 hook useNavigate
  const nav = useNavigate()
  const clickHandler = () => {
    nav('/login')
  }
  return (
    <div className={styles.container}>
      <div className={styles.info} >
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷90份收到答卷 980 份</Paragraph>
        <div>
         <Button type="primary" className={styles.button}  onClick={()=>nav(MANAGE_INDEX_PATHNAME)} >开始使用</Button>
        </div>
      </div>
    </div>
  )
}
export default Home
