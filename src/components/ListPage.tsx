import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
type PropsType = {
  total: number
}
export default function ListPage(props: PropsType): any {
  const { total } = props
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  //   从url中找到page pageSize,并且同步到 Pagination组件中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])
  function handlePageChange(page: number, pageSize: number) {
    // 方法2
    searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <div>
      <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
    </div>
  )
}
