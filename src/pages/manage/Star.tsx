import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionComponents/QuestionCard'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin  } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
const Star: FC = () => {
  useTitle('问卷-标星问卷')
  const { data = {}, loading } = useLoadQuestionListData({ isStart: true })
  const { list = [], total = 0 } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Typography.Title level={3}>星标问卷</Typography.Title>
        </div>
        <div className={styles.right}>
          <ListSearch />{' '}
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />{' '}
          </div>
        )}
        {!loading&&list.length === 0 && <Empty description="暂无数据" />}
        {list.length &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}> 
       <ListPage  total={total} />
      </div>
    </>
  )
}
export default Star
