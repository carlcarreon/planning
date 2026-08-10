import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import type { ChecklistTag, ListItem } from "@/lib/list-items"
import { CalendarDaysIcon, ImageIcon, ListTodo, RefreshCcwIcon } from "lucide-react"

type ChecklistPageProps = {
  items: ListItem[]
}

const filterOptions: Array<{ label: string; tag: ChecklistTag }> = [
  { label: "Places", tag: "Place" },
  { label: "Food", tag: "Food" },
  { label: "Items", tag: "Item" },
  { label: "Other", tag: "Other" },
]

export default function ChecklistPage({ items }: ChecklistPageProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})
  const [activeTags, setActiveTags] = useState<ChecklistTag[]>([])
  const activeFilterCount = activeTags.length

  const visibleItems = useMemo(() => {
    if (activeFilterCount === 0) {
      return items
    }

    return items.filter((item) => item.tags?.some((tag) => activeTags.includes(tag)))
  }, [activeFilterCount, activeTags, items])

  return (
    <section className="w-full space-y-4 text-left">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            activeFilterCount === 0
              ? 'border border-blue-600 bg-blue-600 text-white'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
          onClick={() => setActiveTags([])}
        >
          All{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </button>
        {filterOptions.map(({ label, tag }) => {
          const isActive = activeTags.includes(tag)

          return (
            <button
              key={tag}
              type="button"
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? 'border border-blue-600 bg-blue-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => {
                setActiveTags((current) =>
                  current.includes(tag)
                    ? current.filter((currentTag) => currentTag !== tag)
                    : [...current, tag],
                )
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className="space-y-2.5 pt-1">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
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

                <ImageIcon className="size-4 shrink-0 text-slate-400" aria-hidden="true" />

                <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-500"
                    >
                      {tag}
                    </span>
                  ))}

                  <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium tracking-[0.14em] text-slate-500">
                    <CalendarDaysIcon className="size-4" aria-hidden="true" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Empty className="h-full items-center bg-muted/30">
            <EmptyMedia variant="icon" className="text-blue-600">
              <ListTodo className="size-4" aria-hidden="true" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No matching checklist items</EmptyTitle>
              <EmptyDescription className="max-w-xs text-pretty">
                Try a different tag or clear the filters to see everything again.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" onClick={() => setActiveTags([])}>
                <RefreshCcwIcon data-icon="inline-start" />
                Clear filters
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </div>

      {visibleItems.length > 0 ? (
        <div className="space-y-0 text-center pt-0.5">
          <div className="relative mx-auto w-full max-w-[18rem] overflow-hidden">
            <img
              src="/checklistItemFooterIcon.png"
              alt=""
              aria-hidden="true"
              className="block h-auto w-full"
            />
          </div>

          <div className="space-y-0 text-center -mt-14 sm:-mt-16">
            <p className="text-lg font-semibold tracking-tight leading-none text-slate-900 sm:text-xl">
              One plan at a time,
            </p>
            <p className="text-sm text-slate-500 sm:text-base">
              so many memories to make. 💕
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
