import { Card, CardContent } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { CalendarDaysIcon, ImageIcon, SearchIcon } from "lucide-react"

const wishlistItems = [
  { id: 1, name: "Weekend trip ideas", date: "Aug 7" },
  { id: 2, name: "New camera lens", date: "Aug 8" },
  { id: 3, name: "Ceramic mugs", date: "Aug 9" },
]

export default function WishlistPage() {
  return (
    <section className="w-full max-w-3xl space-y-4 text-left">
      <label className="block">
        <span className="sr-only">Search wishlist</span>
        <InputGroup className="h-9">
          <InputGroupInput className="h-9" placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full border border-blue-600 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white"
        >
          All
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Places
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Food
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Items
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Other
        </button>
      </div>

      <div className="space-y-2.5 pt-1">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            className="border border-slate-50 bg-white shadow-sm ring-0"
          >
            <CardContent className="flex items-center gap-3 px-2.5 py-1">
              <input
                type="checkbox"
                aria-label={`Mark ${item.name} complete`}
                className="size-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {item.name}
                </p>
              </div>

              <ImageIcon className="size-4 shrink-0 text-slate-400" aria-hidden="true" />

              <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium tracking-[0.14em] text-slate-500">
                <CalendarDaysIcon className="size-4" aria-hidden="true" />
                <span>{item.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
