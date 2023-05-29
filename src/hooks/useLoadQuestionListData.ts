import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant'
type OptionType = {
  isStart: boolean | string
  isDeleted: boolean | string
}
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isDeleted, isStart } = opt
  const [searchParams] = useSearchParams()
  const { data, loading, error ,refresh} = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
      return await getQuestionListService({ keyword, isDeleted, isStart, page, pageSize })
    },
    {
      refreshDeps: [searchParams], //刷新的依赖项
    }
  )
  return { data, loading, error,refresh }
}
export default useLoadQuestionListData
