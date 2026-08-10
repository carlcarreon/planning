import { Card, CardContent } from "@/components/ui/card"
import {
  Camera,
  CalendarDaysIcon,
  ChevronRight,
  CircleHelp,
  Globe,
  ImageIcon,
  LockKeyhole,
  LogOut,
  Palette,
  StarIcon,
  UserRound,
  UsersRound,
  Heart,
} from "lucide-react"

const profileStats = [
  { id: "plans", icon: CalendarDaysIcon, value: "128", label: "Plans", tone: "text-rose-500" },
  { id: "wishlist", icon: StarIcon, value: "24", label: "Wishlist", tone: "text-violet-500" },
  { id: "memories", icon: ImageIcon, value: "56", label: "Memories", tone: "text-pink-500" },
]

const profileMenuItems = [
  { id: "edit-profile", label: "Edit Profile", Icon: UserRound, tone: "text-rose-500" },
  { id: "account", label: "Account & Preferences", Icon: UsersRound, tone: "text-rose-500" },
  { id: "privacy", label: "Privacy", Icon: LockKeyhole, tone: "text-rose-500" },
  { id: "appearance", label: "Appearance", Icon: Palette, value: "Light", tone: "text-rose-500" },
  { id: "language", label: "Language", Icon: Globe, value: "English", tone: "text-rose-500" },
  { id: "help", label: "Help & Support", Icon: CircleHelp, tone: "text-violet-500" },
  { id: "logout", label: "Log Out", Icon: LogOut, tone: "text-rose-500" },
]

export default function ProfilePage() {
  return (
    <section className="w-full space-y-4 text-left">
      <Card className="border border-slate-50 bg-white py-1 shadow-sm ring-0">
        <CardContent className="flex items-center gap-4 px-2 py-2">
          <div className="flex w-32 shrink-0 justify-center">
            <div className="relative flex aspect-square w-28 items-center justify-center rounded-full bg-[rgba(29,78,216,0.08)] ring-1 ring-blue-200/70">
              <UserRound className="size-7 text-blue-600" aria-hidden="true" />
              <div className="absolute bottom-3 right-2 flex size-6 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                <Camera className="size-3" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-2xl font-semibold tracking-tight text-slate-900">
              John & Mia
            </p>

            <div className="mt-4 grid grid-cols-3 justify-items-start gap-2 sm:gap-4">
              {profileStats.map(({ id, icon: Icon, value, label, tone }) => (
                <div key={id} className="flex flex-col items-center text-left">
                  <Icon className={`size-5 ${tone}`} aria-hidden="true" />
                  <span className="text-lg font-semibold text-slate-900">{value}</span>
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Card className="overflow-hidden border border-slate-100 bg-white shadow-sm ring-0 py-0">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {profileMenuItems.map(({ id, label, Icon, value, tone }) => (
                <button
                  key={id}
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                >
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${tone}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>

                  <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-slate-900">
                    {label}
                  </span>

                  {value ? (
                    <span className="text-sm text-slate-400">{value}</span>
                  ) : null}

                  <ChevronRight
                    className="size-4 shrink-0 text-slate-300"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-slate-100 bg-white shadow-sm ring-0 py-0">
          <CardContent className="flex items-center gap-3 px-4 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full text-rose-500">
              <Heart className="size-5" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[15px] font-medium text-slate-900">
                About Together
              </p>
              <p className="text-sm text-slate-400">Version 1.0.0</p>
            </div>

            <ChevronRight className="size-4 shrink-0 text-slate-300" aria-hidden="true" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
