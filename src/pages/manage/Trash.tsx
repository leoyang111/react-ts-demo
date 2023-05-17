import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionComponents/QuestionCard'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Space, Button,Modal,message } from 'antd';
import ListSearch from '../../components/ListSearch'
import {
  ExclamationCircleOutlined
} from '@ant-design/icons'
const {confirm}=Modal
const Trash: FC = () => {
  useTitle('问卷-回收站')
  const [selectedIds,setSelectedIds]=useState<string []>([])
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
      render:(isPublished:boolean)=>{
        return isPublished ? <Tag color='processing' >已发布</Tag>:<Tag>未发布</Tag>
      }
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
  ];
    /** 删除 */
    const delHandle=()=>{
      confirm({
        title: '删除',
        icon: <ExclamationCircleOutlined />,
        content: '确定删除该条数据吗',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          message.success('删除成功')
        },
      })
    }
    const restoreHandle=()=>{
      confirm({
        title: '恢复',
        icon: <ExclamationCircleOutlined />,
        content: '确定恢复该条数据吗',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          message.success('恢复成功')
        },
      })
    }
  const TableElem=<>
  <div 
  style={{marginBottom:'16px'}} >
    <Space>
      <Button type="primary" disabled={selectedIds.length===0} onClick={restoreHandle} >恢复</Button>
      <Button danger disabled={selectedIds.length===0} onClick={delHandle} >彻底删除</Button>
    </Space>
  </div>
     <Table 
        dataSource={questionList} 
        columns={columns}
         pagination={false}
          rowKey={q=>q._id}
          rowSelection={{
            type:'checkbox',
            onChange:(selectedRowKeys)=>{ setSelectedIds(selectedRowKeys as string[])}
          }}
           ></Table>
  </>
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Typography.Title level={3} >回收站</Typography.Title>
        </div>
        <div className={styles.right}><ListSearch/> </div>
      </div>
      <div className={styles.content}>
      {questionList.length===0&&<Empty description='暂无数据'/>}
        {questionList.length && TableElem
          }
      </div>
      <div className={styles.footer}> loadMore...</div>
    </>
  )
}
export default Trash
