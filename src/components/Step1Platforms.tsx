import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWizardStore } from "@/store/wizardStore"
import clsx from "clsx"
import { toast } from "sonner"

import { Facebook, Instagram, Linkedin } from "lucide-react"

const PLATFORMS = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "LinkedIn", icon: Linkedin },
  { label: "X (Twitter)", icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M19.6 3H22l-6.8 7.8L23 21h-7.7l-6.1-7.5L2.4 21H0l7.4-8.5L1 3h7.9l5.5 6.9L19.6 3z" />
      </svg>
    )
  }
]

export function Step1Platforms() {
  const { data, updateData, nextStep } = useWizardStore()

  const togglePlatform = (platform: string) => {
    const alreadySelected = data.platforms.includes(platform)
    const newSelection = alreadySelected
      ? data.platforms.filter((p) => p !== platform)
      : [...data.platforms, platform]

    updateData({ platforms: newSelection })
  }

  const handleNext = () => {
    if (data.platforms.length === 0) {
      toast.error("Please select at least one platform.")
      return
    }
    nextStep()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Step 1: Choose Platforms</h2>

      <div className="grid grid-cols-2 gap-4">
        {PLATFORMS.map(({ label, icon: Icon }) => {
          const isSelected = data.platforms.includes(label)
          return (
            <Card
              key={label}
              onClick={() => togglePlatform(label)}
              className={clsx(
                "cursor-pointer hover:border-primary transition-colors group",
                isSelected && "border-primary bg-muted"
              )}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                <div className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  isSelected ? "bg-blue-500 text-white" : "bg-gray-700 text-white group-hover:bg-primary group-hover:text-white"
                )}>
                  <Icon />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="pt-4">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
