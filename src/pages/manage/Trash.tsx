import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionComponents/QuestionCard'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Space, Button, Modal, message, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListPage from '../../components/ListPage'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'
import { useRequest } from 'ahooks'
const { confirm } = Modal
const Trash: FC = () => {
  useTitle('问卷-回收站')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
  ]
  /** 删除 */
  const delHandle = () => {
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该条数据吗',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        delHandles()
      },
    })
  }
  const { run: delHandles } = useRequest(async () => deleteQuestionsService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      refresh()
      setSelectedIds([])
    },
  })
  //恢复
  const { run: restoreHandle } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      onSuccess() {
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      },
      debounceWait: 500,
    }
  )
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={restoreHandle}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={delHandle}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Typography.Title level={3}>回收站</Typography.Title>
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
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}
export default Trash
