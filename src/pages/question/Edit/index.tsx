import React, { FC, useEffect, useState } from 'react'
// import {useParams} from 'react-router-dom'
// import {getQuestionService} from '../../../services/question'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
const Edit: FC = () => {
  const { data, loading } = useLoadQuestionData()

  return <div>Edit {loading ? '加载中' : JSON.stringify(data)} </div>
}
export default Edit
