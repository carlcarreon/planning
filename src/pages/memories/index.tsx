import { Card, CardContent } from "@/components/ui/card"
import { ImageOff, ImageIcon, CalendarDaysIcon } from "lucide-react"

export default function MemoriesPage() {
  return (
    <section className="w-full max-w-3xl space-y-4 text-left">
      <Card className="border border-slate-50 bg-white py-1 shadow-sm ring-0">
        <CardContent className="flex min-h-28 p-1">
          <div className="w-[30%] shrink-0 bg-slate-100">
            <div className="flex h-full min-h-28 items-center justify-center border-r border-slate-200/70">
              <ImageOff className="size-5 text-slate-400" aria-hidden="true" />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-start gap-2 px-4 py-2">
            <div className="space-y-0.5">
              <p className="truncate text-sm font-medium text-slate-900">
                Memory title
              </p>

            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <CalendarDaysIcon className="size-4" aria-hidden="true" />
              <span>Aug 7, 2026</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <ImageIcon className="size-4" aria-hidden="true" />
              <span>3 photos</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
