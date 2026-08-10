import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { ImagePlus, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

type PageType = 'checklist' | 'wishlist'

type AddItemDialogProps = {
  open: boolean
  page: PageType
  onOpenChange: (open: boolean) => void
  onSubmit: (item: { name: string; imageUrls?: string[] }) => void
}

export default function AddItemDialog({
  open,
  page,
  onOpenChange,
  onSubmit,
}: AddItemDialogProps) {
  const [name, setName] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [imageError, setImageError] = useState<string | null>(null)
  const imageInputId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    setName('')
    setImageUrls([])
    setImageError(null)
  }, [open, page])

  const title = page === 'checklist' ? 'Add checklist item' : 'Add wishlist item'
  const description =
    page === 'checklist'
      ? 'Save a new plan for your checklist.'
      : 'Save a new idea for your wishlist.'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      return
    }

    onSubmit({
      name: trimmedName,
      imageUrls: page === 'wishlist' ? imageUrls : undefined,
    })

    onOpenChange(false)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])

    if (files.length === 0) {
      setImageError(null)
      return
    }

    if (files.some((file) => !file.type.startsWith('image/'))) {
      setImageError('Please choose an image file.')
      event.target.value = ''
      return
    }

    setImageError(null)
    Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                resolve(reader.result)
                return
              }

              reject(new Error('Unable to read image.'))
            }
            reader.onerror = () => reject(new Error('Unable to read image.'))
            reader.readAsDataURL(file)
          }),
      ),
    )
      .then((nextImageUrls) => {
        setImageUrls((current) => [...current, ...nextImageUrls])
        event.target.value = ''
      })
      .catch(() => {
        setImageError('Unable to read one of the selected images.')
        event.target.value = ''
      })
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setImageUrls((current) => current.filter((_, index) => index !== indexToRemove))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal>
      <DialogContent showCloseButton={false} className="w-[calc(100vw-2rem)] max-w-md">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <Plus className="size-4" aria-hidden="true" />
              </span>
              <DialogTitle>{title}</DialogTitle>
            </div>
            <DialogDescription>{description}</DialogDescription>
          </div>

          <DialogClose
            className="flex size-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
            aria-label="Close dialog"
          >
            <X className="size-4" aria-hidden="true" />
          </DialogClose>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-left">
            <span className="text-sm font-semibold text-slate-900">Item name</span>
            <Input
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={page === 'checklist' ? 'Plan your next step' : 'Add a wish'}
              className="h-11 rounded-sm border-slate-200 bg-white text-[15px] placeholder:text-slate-400"
              required
            />
          </label>

          {page === 'wishlist' ? (
            <label className="block space-y-2 text-left">
              <span className="text-sm font-semibold text-slate-900">Image</span>
              <div className="space-y-2">
                <div className="flex min-w-0 flex-wrap items-start justify-start gap-2">
                  {imageUrls.length > 0 ? (
                    <>
                      {imageUrls.map((imageUrl, index) => (
                        <div
                          key={`${imageUrl.slice(0, 24)}-${index}`}
                          className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:w-28"
                        >
                          <img
                            src={imageUrl}
                            alt={`Selected wishlist item ${index + 1}`}
                            className="size-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:text-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                            aria-label={`Remove image ${index + 1}`}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="size-3" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </>
                  ) : null}
                  <input
                    id={imageInputId}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor={imageInputId}
                    className="flex aspect-square w-24 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-rose-500 transition hover:border-rose-200 hover:bg-rose-50/60 focus-within:ring-2 focus-within:ring-rose-300 sm:w-28"
                  >
                    <span className="sr-only">Add image</span>
                    <ImagePlus className="size-6" aria-hidden="true" />
                  </label>
                </div>
                {imageUrls.length > 0 ? (
                  <p className="text-xs text-slate-500">
                    {imageUrls.length} image{imageUrls.length === 1 ? '' : 's'} selected
                  </p>
                ) : null}
                {imageError ? (
                  <p className="text-xs text-rose-500" role="alert">
                    {imageError}
                  </p>
                ) : null}
              </div>
            </label>
          ) : null}

          <div className="flex gap-3 pt-2">
            <DialogClose
              className="h-11 flex-1 rounded-md border border-border bg-transparent px-4 text-sm font-medium text-slate-900 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              aria-label="Cancel"
            >
              Cancel
            </DialogClose>
            <Button type="submit" className="h-11 flex-1">
              Add item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
