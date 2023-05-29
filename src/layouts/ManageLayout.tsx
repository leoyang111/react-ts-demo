import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Divider, message } from 'antd'
import { creatQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation() //获取路由网址
  // const [loading, setLoading] = useState(false)
  // async function handleCreateClick() {
  //   setLoading(true)
  //   const res = await creatQuestionService()
  //   const { id } = res || {}
  //   if (id) {
  //     message.success('创建成功')
  //     nav(`/question/edit/${id}`)
  //   }
  //   setLoading(false)
  // }
  const {
    loading,
    error,
    run: handleCreateClick,
  } = useRequest(creatQuestionService, {
    manual: true,
    onSuccess(res) {
      console.log(res)
      if (res.id) {
        message.success('创建成功')
        nav(`/question/edit/${res.id}`)
      }
    },
  })
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateClick}
              disabled={loading}
            >
              新建问卷
            </Button>
            <Divider style={{ borderTop: 'transparent' }}></Divider>
            <Button
              type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => nav('/manage/list')}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
              size="large"
              icon={<StarOutlined />}
              onClick={() => nav('/manage/star')}
            >
              星标问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => nav('/manage/trash')}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default ManageLayout
