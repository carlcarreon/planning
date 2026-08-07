import { Heart, Image, ListTodo, UserRound } from 'lucide-react'

type PageKey = 'todo' | 'wishlist' | 'memories' | 'profile'

type BottomNavProps = {
  activePage: PageKey
  onSelect: (page: PageKey) => void
}

const items: Array<{
  key: PageKey
  label: string
  Icon: typeof ListTodo
}> = [
  { key: 'todo', label: 'Checklist', Icon: ListTodo },
  { key: 'wishlist', label: 'Wishlist', Icon: Heart },
  { key: 'memories', label: 'Memories', Icon: Image },
  { key: 'profile', label: 'Profile', Icon: UserRound },
]

export default function BottomNav({ activePage, onSelect }: BottomNavProps) {
  return (
    <nav aria-label="Bottom navigation" className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`bottom-nav__item${
            activePage === item.key ? ' bottom-nav__item--active' : ''
          }`}
          aria-current={activePage === item.key ? 'page' : undefined}
          onClick={() => onSelect(item.key)}
        >
          <span className="bottom-nav__content">
            <item.Icon className="bottom-nav__icon" aria-hidden="true" />
            <span>{item.label}</span>
          </span>
        </button>
      ))}
    </nav>
  )
}
