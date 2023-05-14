import React from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
const { Title } = Typography
export default function Logo() {
  return (
    <div>
      <Link to={'/'}>
        <Space className={styles.container}>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷</Title>
        </Space>
      </Link>
    </div>
  )
}
