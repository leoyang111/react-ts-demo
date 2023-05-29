//useLoadQuestionData
import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {getQuestionService} from '../services/question'
import {useRequest} from 'ahooks'
function useLoadQuestionData(){
    const {id=''}=useParams()
    async function load(){
        const data=await getQuestionService(id)
        return data
    }
    const {loading,data,error}=useRequest(load)
//   const [loading,setLoading]=useState(false)
//   const [questionData,serQuestionData]=useState({})
//   useEffect(()=>{
//     async function fn() {
//       setLoading(true)
//       const data=await getQuestionService(id)
//       serQuestionData(data)
//       setLoading(false)
//       console.log(data,'===>');
      
//     }
//     fn()
//   },[])
//   return {loading,questionData}
return {loading,data,error}
}
export default useLoadQuestionData