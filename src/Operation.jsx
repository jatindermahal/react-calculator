export default function Operation({dispatch,operator}) {
  return (
    <button onClick={()=>dispatch({type:"operation", data:{operator}})}>
        {operator}
    </button>
  )
}
