import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionComponents/QuestionCard'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography} from 'antd'
const List: FC = () => {
  useTitle('问卷-我的问卷')
  const [searchParams] = useSearchParams()
  console.log('keyword', searchParams.get('keyword'), searchParams.get('id'))

  const [questionList, setQuestionList] = useState([
    {
      _id: 'q1',
      title: '问卷1',
      isPublished: true,
      isStart: false,
      answerCount: 5,
      createAt: '3月10日 13:22',
    },
    {
      _id: 'q2',
      title: '问卷2',
      isPublished: false,
      isStart: true,
      answerCount: 5,
      createAt: '3月10日 13:22',
    },
    {
      _id: 'q3',
      title: '问卷3',
      isPublished: false,
      isStart: false,
      answerCount: 5,
      createAt: '3月10日 13:22',
    },
    {
      _id: 'q4',
      title: '问卷4',
      isPublished: false,
      isStart: false,
      answerCount: 5,
      createAt: '3月10日 13:22',
    },
  ])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Typography.Title level={3} >我的问卷</Typography.Title>
        </div>
        <div className={styles.right}>(搜索) </div>
      </div>
      <div className={styles.content}>
        {questionList.length &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}> loadMore...</div>
    </>
  )
}
export default List
