import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

export default function Filter() {
  const dispatch = useDispatch()

  function handleChange(e) {
    const filter = e.target.value
    dispatch(filterChange(filter))
    console.log(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}