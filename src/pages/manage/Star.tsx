import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionComponents/QuestionCard'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle,  } from 'ahooks';
import { Typography ,Empty} from 'antd'

const Star: FC = () => {
  useTitle('问卷-标星问卷')
  const [questionList, setQuestionList] = useState([
    {
      _id: 'q1',
      title: '问卷1',
      isPublished: true,
      isStart: true,
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
      isStart: true,
      answerCount: 5,
      createAt: '3月10日 13:22',
    },

  ])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Typography.Title level={3}>星标问卷</Typography.Title>
        </div>
        <div className={styles.right}>(搜索) </div>
      </div>
      <div className={styles.content}>
        {questionList.length===0&&<Empty description='暂无数据'/>}
        {questionList.length>0 &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}> 分页</div>
    </>
  )
}
export default Star
