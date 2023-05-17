import React, { useState ,useEffect} from 'react'
import { Input } from 'antd'
import type { ChangeEvent } from 'react'
import { useNavigate,useLocation,useSearchParams } from 'react-router-dom'
import {LIST_SEARCH_PARAM_KEY} from '../constant'
const { Search } = Input
export default function ListSearch() {
    const nav=useNavigate()
    const {pathname}=useLocation()
  const [value, setValue] = useState('')
  const [searchParams]=useSearchParams()
  const handleSearch = (value: string) => {
    console.log(value)
    nav({
        pathname,
        search:`${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }
  useEffect(()=>{
    const vurVal=searchParams.get(LIST_SEARCH_PARAM_KEY)|| ''
    setValue(vurVal)
  },[searchParams])
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      onSearch={handleSearch}
      style={{ width: '260px' }}
      onChange={handleChange}
      value={value}
    />
  )
}
