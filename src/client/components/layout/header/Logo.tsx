import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <div className='text-accent text-4xl font-bold font-serif uppercase text-center mb-6'>
      <Link to='/'>My Games List</Link>
    </div>
  )
}
