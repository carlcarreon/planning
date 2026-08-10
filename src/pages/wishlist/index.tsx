import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { ListItem } from "@/lib/list-items"
import { CalendarDaysIcon, ImageIcon } from "lucide-react"

type WishlistPageProps = {
  items: ListItem[]
}

export default function WishlistPage({ items }: WishlistPageProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  return (
    <section className="w-full space-y-4 text-left">
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
        {items.map((item) => (
          <Card
            key={item.id}
            className="border border-slate-50 bg-white shadow-sm ring-0"
          >
            <CardContent className="flex items-center gap-3 px-2.5 py-1">
              <Checkbox
                aria-label={`Mark ${item.name} complete`}
                checked={checkedItems[item.id] ?? false}
                onCheckedChange={(checked) => {
                  setCheckedItems((current) => ({
                    ...current,
                    [item.id]: checked === true,
                  }))
                }}
                className="text-blue-600 data-checked:border-blue-600 data-checked:bg-blue-600 focus-visible:ring-blue-200"
              />

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium text-slate-900 ${
                    checkedItems[item.id] ? "line-through opacity-50" : ""
                  }`}
                >
                  {item.name}
                </p>
              </div>

              {item.imageUrls?.length ? (
                <div className="flex max-w-[8.5rem] shrink-0 items-center gap-2 overflow-hidden">
                  {item.imageUrls.slice(0, 3).map((imageUrl, index) => (
                    <div
                      key={`${imageUrl.slice(0, 24)}-${index}`}
                      className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-slate-100 text-slate-400"
                    >
                      <img
                        src={imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="size-full object-cover"
                      />
                    </div>
                  ))}
                  {item.imageUrls.length > 3 ? (
                    <span className="text-[11px] font-medium text-slate-400">
                      +{item.imageUrls.length - 3}
                    </span>
                  ) : null}
                </div>
              ) : (
                <div className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-slate-100 text-slate-400">
                  <ImageIcon className="size-4" aria-hidden="true" />
                </div>
              )}

              <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium tracking-[0.14em] text-slate-500">
                <CalendarDaysIcon className="size-4" aria-hidden="true" />
                <span>{item.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-0 text-center pt-0.5">
        <div className="relative mx-auto w-full max-w-[18rem] overflow-hidden">
          <img
            src="/wishlistItemFooterIcon.png"
            alt=""
            aria-hidden="true"
            className="block h-auto w-full"
          />
        </div>

        <div className="space-y-0 text-center -mt-14 sm:-mt-16">
          <p className="text-lg font-semibold tracking-tight leading-none text-slate-900 sm:text-xl">
            Little dreams today,
          </p>
          <p className="text-sm text-slate-500 sm:text-base">
            big memories tomorrow. 💜
          </p>
        </div>
      </div>
    </section>
  )
}
