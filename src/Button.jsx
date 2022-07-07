export default function Button({digit, dispatch}) {
  return (
    <button onClick={()=>dispatch({type:"add-num", data:{digit}})}>
        {digit}
    </button>
  )
}
