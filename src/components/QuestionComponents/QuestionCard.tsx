import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Typography, Space, Divider, Tag, Popconfirm, message, Modal } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '../../services/question'
import { useRequest } from 'ahooks'
const { confirm } = Modal
type PropsType = {
  _id: string
  title: string
  isStart: boolean
  answerCount: number
  createAt: string
  isPublished: boolean
}
//
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const Nav = useNavigate()
  const { _id, title, createAt, answerCount, isPublished, isStart } = props
  const [isStarState, setIsStarState] = useState(isStart)
  // 复制
  const { loading: copyHandleLoading, run: copyHandle } = useRequest(
    async () => {
      return await duplicateQuestionService(_id)
    },
    {
      manual: true,
      onSuccess(res: any) {
        message.success('复制成功')
        Nav(`/question/edit/${res.id}`)
      },
    }
  )
  /** 删除 */
  const [isDeletedState, setIsDeletedState] = useState(false)
  const delHandle = () => {
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该条数据吗',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        delHandleRun()
      },
    })
  }
  const { loading: delHandleLoading, run: delHandleRun } = useRequest(
    async () => updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess(res) {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )
  const { loading: changStarLoading, run: changStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStart: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )
  if (isDeletedState) return null
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStarState && <StarOutlined style={{ color: 'red' }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷:{answerCount}</span>
              <span>{createAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles.button_container}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => Nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => Nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Button
              icon={<StarOutlined />}
              type="text"
              size="small"
              onClick={changStar}
              disabled={changStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title={'复制'}
              description={'确定复制吗'}
              onConfirm={copyHandle}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<CopyOutlined />} type="text" size="small" disabled={copyHandleLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              size="small"
              onClick={delHandle}
              disabled={delHandleLoading}
            >
              删除
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default QuestionCard
