export default function Operation({dispatch,operator}) {
  return (
    <button className="operations" onClick={()=>dispatch({type:"operation", data:{operator}})}>
        {operator}
    </button>
  )
}
