import { Skeleton } from "@/components/ui/skeleton"
import type { AuthPageKey, PageKey } from "@/lib/navigation"

function HeaderSkeleton() {
  return (
    <header className="app-shell__header flex items-center justify-between px-2 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <Skeleton className="size-10 rounded-full bg-slate-100" />
        <Skeleton className="size-10 rounded-full bg-slate-100" />
      </div>
      <Skeleton className="size-10 rounded-full bg-slate-100" />
    </header>
  )
}

function BottomNavSkeleton() {
  return (
    <nav aria-hidden="true" className="bottom-nav">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bottom-nav__item" role="presentation">
          <span className="bottom-nav__content">
            <Skeleton className="bottom-nav__icon rounded-full bg-slate-200" />
            <Skeleton className="h-3.5 w-14 rounded-full bg-slate-200" />
          </span>
        </div>
      ))}
    </nav>
  )
}

function AuthHeroSkeleton() {
  return (
    <div className="space-y-0 text-center">
      <div className="relative mx-auto w-full max-w-[42rem] overflow-hidden rounded-2xl">
        <Skeleton className="h-[24rem] w-full rounded-2xl bg-slate-100 sm:h-[26rem]" />
      </div>

      <div className="space-y-2 text-center -mt-[8.75rem]">
        <Skeleton className="mx-auto h-8 w-48 rounded-full bg-slate-100 sm:h-9 sm:w-56" />
        <Skeleton className="mx-auto h-4 w-60 rounded-full bg-slate-100 sm:h-5 sm:w-72" />
      </div>
    </div>
  )
}

function AuthFormSkeleton({ page }: { page: AuthPageKey }) {
  const fieldCount = page === "register" ? 4 : 2

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <Skeleton className="h-8 w-52 rounded-full bg-slate-100" />
        <Skeleton className="h-4 w-56 rounded-full bg-slate-100" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: fieldCount }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-full bg-slate-100" />
            <Skeleton className="h-12 w-full rounded-sm bg-slate-100" />
          </div>
        ))}

        <div className="flex items-center justify-between gap-3">
          {page === "register" ? (
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded border border-slate-200 bg-slate-100" />
              <Skeleton className="h-3.5 w-56 rounded-full bg-slate-100" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded border border-slate-200 bg-slate-100" />
              <Skeleton className="h-3.5 w-28 rounded-full bg-slate-100" />
            </div>
          )}

          {page === "login" ? (
            <Skeleton className="h-3.5 w-28 rounded-full bg-slate-100" />
          ) : null}
        </div>

        <Skeleton className="h-12 w-full rounded-md bg-slate-100" />

        {page === "login" ? (
          <>
            <Skeleton className="h-4 w-40 rounded-full bg-slate-100" />
            <div className="flex items-center gap-4 py-1">
              <Skeleton className="h-px flex-1 rounded-full bg-slate-100" />
              <Skeleton className="h-3.5 w-36 rounded-full bg-slate-100" />
              <Skeleton className="h-px flex-1 rounded-full bg-slate-100" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-12 flex-1 rounded-md bg-slate-100" />
              <Skeleton className="h-12 flex-1 rounded-md bg-slate-100" />
            </div>
          </>
        ) : null}

        <Skeleton className="mx-auto h-4 w-64 rounded-full bg-slate-100" />
      </div>
    </div>
  )
}

export function AuthPageSkeleton({ page }: { page: AuthPageKey }) {
  return (
    <section className="w-full space-y-12 px-4 text-left" aria-busy="true" aria-live="polite">
      <AuthHeroSkeleton />
      <AuthFormSkeleton page={page} />
    </section>
  )
}

function ListRowSkeleton() {
  return (
    <div className="rounded-md border border-slate-50 bg-white px-2.5 py-1 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="size-4 shrink-0 rounded-[4px] bg-slate-100" />
        <Skeleton className="h-4 flex-1 rounded-full bg-slate-100" />
        <Skeleton className="size-4 shrink-0 rounded-sm bg-slate-100" />
        <div className="flex shrink-0 items-center gap-1.5">
          <Skeleton className="size-4 rounded-sm bg-slate-100" />
          <Skeleton className="h-3.5 w-10 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  )
}

function TaskFooterSkeleton({
  titleWidth,
  captionWidth,
}: {
  titleWidth: string
  captionWidth: string
}) {
  return (
    <div className="space-y-0 text-center pt-0.5">
      <Skeleton className="mx-auto h-40 w-full max-w-[18rem] rounded-2xl bg-slate-100" />

      <div className="space-y-2 text-center -mt-14 sm:-mt-16">
        <Skeleton className={`mx-auto h-5 ${titleWidth} rounded-full bg-slate-100 sm:h-6`} />
        <Skeleton className={`mx-auto h-4 ${captionWidth} rounded-full bg-slate-100 sm:h-5`} />
      </div>
    </div>
  )
}

function ListPageSkeleton({
  titleWidth,
  captionWidth,
}: {
  titleWidth: string
  captionWidth: string
}) {
  return (
    <section className="w-full space-y-4 text-left" aria-busy="true" aria-live="polite">
      <div className="flex flex-wrap gap-2">
        {["w-10", "w-14", "w-12", "w-12", "w-12"].map((width, index) => (
          <Skeleton
            key={index}
            className={`h-8 rounded-full bg-slate-100 ${width}`}
          />
        ))}
      </div>

      <div className="space-y-2.5 pt-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <ListRowSkeleton key={index} />
        ))}
      </div>

      <TaskFooterSkeleton titleWidth={titleWidth} captionWidth={captionWidth} />
    </section>
  )
}

function MemoriesPageSkeleton() {
  return (
    <section className="w-full space-y-4 text-left" aria-busy="true" aria-live="polite">
      <div className="border border-slate-50 bg-white py-1 shadow-sm ring-0">
        <div className="flex min-h-28 gap-0 p-1">
          <Skeleton className="w-[30%] shrink-0 rounded-none bg-slate-100" />
          <div className="flex flex-1 flex-col justify-start gap-2 px-4 py-2">
            <Skeleton className="h-4 w-40 rounded-full bg-slate-100" />
            <Skeleton className="h-3.5 w-28 rounded-full bg-slate-100" />
            <Skeleton className="h-3.5 w-24 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>

      <div className="space-y-0 text-center pt-0.5">
        <Skeleton className="mx-auto h-40 w-full max-w-[18rem] rounded-2xl bg-slate-100" />

        <div className="space-y-2 text-center -mt-14 sm:-mt-16">
          <Skeleton className="mx-auto h-5 w-44 rounded-full bg-slate-100 sm:h-6" />
          <Skeleton className="mx-auto h-4 w-60 rounded-full bg-slate-100 sm:h-5" />
        </div>
      </div>
    </section>
  )
}

function ProfilePageSkeleton() {
  return (
    <section className="w-full space-y-4 text-left" aria-busy="true" aria-live="polite">
      <div className="border border-slate-50 bg-white py-1 shadow-sm ring-0">
        <div className="flex items-center gap-4 px-2 py-2">
          <div className="flex w-32 shrink-0 justify-center">
            <div className="relative flex aspect-square w-28 items-center justify-center rounded-full bg-[rgba(29,78,216,0.08)] ring-1 ring-blue-200/70">
              <Skeleton className="size-7 rounded-full bg-slate-100" />
              <Skeleton className="absolute bottom-3 right-2 size-6 translate-x-1/4 translate-y-1/4 rounded-full bg-slate-100" />
            </div>
          </div>

          <div className="min-w-0 flex-1 text-left">
            <Skeleton className="h-8 w-48 rounded-full bg-slate-100" />

            <div className="mt-4 grid grid-cols-3 justify-items-start gap-2 sm:gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center text-left">
                  <Skeleton className="size-5 rounded-full bg-slate-100" />
                  <Skeleton className="mt-1 h-5 w-8 rounded-full bg-slate-100" />
                  <Skeleton className="mt-1 h-3.5 w-10 rounded-full bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="overflow-hidden border border-slate-100 bg-white shadow-sm ring-0 py-0">
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-3">
                <Skeleton className="size-9 shrink-0 rounded-full bg-slate-100" />
                <Skeleton className="h-4 flex-1 rounded-full bg-slate-100" />
                {index === 4 || index === 5 ? (
                  <Skeleton className="h-4 w-12 rounded-full bg-slate-100" />
                ) : null}
                <Skeleton className="size-4 shrink-0 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden border border-slate-100 bg-white shadow-sm ring-0 py-0">
          <div className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="size-9 shrink-0 rounded-full bg-slate-100" />
            <div className="min-w-0 flex-1 text-left">
              <Skeleton className="h-4 w-32 rounded-full bg-slate-100" />
              <Skeleton className="mt-1 h-3.5 w-20 rounded-full bg-slate-100" />
            </div>
            <Skeleton className="size-4 shrink-0 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function AppPageSkeleton({ page }: { page: PageKey }) {
  if (page === "profile") {
    return <ProfilePageSkeleton />
  }

  if (page === "memories") {
    return <MemoriesPageSkeleton />
  }

  if (page === "wishlist") {
    return <ListPageSkeleton titleWidth="w-44" captionWidth="w-64" />
  }

  return <ListPageSkeleton titleWidth="w-44" captionWidth="w-60" />
}

export function AppShellSkeleton({
  page,
  showHeader = true,
}: {
  page: PageKey
  showHeader?: boolean
}) {
  return (
    <div className="app-shell min-h-screen flex flex-col bg-white text-slate-900">
      {showHeader ? <HeaderSkeleton /> : null}
      <main className="app-shell__content flex-1 min-h-0 overflow-hidden">
        <div className="app-shell__scroll-area">
          <div className="app-shell__page">
            <AppPageSkeleton page={page} />
          </div>
        </div>
      </main>
      <BottomNavSkeleton />
    </div>
  )
}
