export type ListItem = {
  id: number
  name: string
  date: string
  tags?: ChecklistTag[]
  imageUrls?: string[]
}

export type ChecklistTag = 'Place' | 'Food' | 'Item' | 'Other'

export const initialChecklistItems: ListItem[] = [
  { id: 1, name: 'Morning market run', date: 'Aug 7' },
  { id: 2, name: 'Cafe shortlist', date: 'Aug 8' },
  { id: 3, name: 'Weekend groceries', date: 'Aug 9' },
]

export const initialWishlistItems: ListItem[] = [
  { id: 1, name: 'Weekend trip ideas', date: 'Aug 7' },
  { id: 2, name: 'New camera lens', date: 'Aug 8' },
  { id: 3, name: 'Ceramic mugs', date: 'Aug 9' },
]
