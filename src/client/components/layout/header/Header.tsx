import { FiltersMenu } from './filters-menu/FiltersMenu'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className='mt-6'>
      <Logo />
      <FiltersMenu />
    </header>
  )
}
