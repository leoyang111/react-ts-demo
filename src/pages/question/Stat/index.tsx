import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
const Stat: FC = () => {
  const { data, loading } = useLoadQuestionData()

  return <div>stat {loading ? '加载中' : JSON.stringify(data)} </div>
}
export default Stat
