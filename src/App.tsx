import { useState } from 'react'
import AppLayout from './layouts/AppLayout'
import ChecklistPage from './pages/checklist'
import MemoriesPage from './pages/memories'
import ProfilePage from './pages/profile'
import WishlistPage from './pages/wishlist'

type PageKey = 'todo' | 'wishlist' | 'memories' | 'profile'

function App() {
  const [activePage, setActivePage] = useState<PageKey>('todo')

  return (
    <AppLayout activePage={activePage} onSelectPage={setActivePage}>
      {activePage === 'todo' && <ChecklistPage />}
      {activePage === 'wishlist' && <WishlistPage />}
      {activePage === 'memories' && <MemoriesPage />}
      {activePage === 'profile' && <ProfilePage />}
    </AppLayout>
  )
}

export default App
