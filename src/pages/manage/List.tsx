import React, { FC, useState, useEffect, useRef ,useMemo} from 'react'
import QuestionCard from '../../components/QuestionComponents/QuestionCard'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { STAT_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
const List: FC = () => {
  useTitle('问卷-我的问卷')
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  // const {data={},loading}=useRequest(getQuestionListService)
 
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  // const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [started, setStarted] = useState(false) //标记是否已经开始加载，防抖有延迟时间
  const haveMoreData = total > list.length

  useEffect(()=>{
    setStarted(false)
    setPage(1)
    setTotal(0)
    setList([])
  },[keyword])
  // 正在加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: STAT_PAGE_SIZE,
        keyword: LIST_SEARCH_PARAM_KEY || '',
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        setList(list.concat(result.list))
        setTotal(result.total)
        setPage(page + 1)
      },
    }
  )
  // 触发加载更多的函数
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        //加载更多的dom出现在视口中
        load()
        setStarted(true)
      }
    },
    { wait: 1000 }
  )
  // 当页面加载或者url参数（keyword)变化时触发加载
  useEffect(() => {
    // async function load() {
    //   const data = await getQuestionListService()
    //   const { list, total } = data
    //   setList(list)
    //   setTotal(total)
    // }
    // load()
    tryLoadMore()
  }, [searchParams])
  // 监听滚动
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total == 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  },[started,loading,haveMoreData])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Typography.Title level={3}>我的问卷</Typography.Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />{' '}
          </div>
        )} */}
        {list.length &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}
export default List
