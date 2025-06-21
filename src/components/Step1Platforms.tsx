import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWizardStore } from "@/store/wizardStore"
import clsx from "clsx"
import { toast } from "sonner"

const PLATFORMS = ["Facebook", "Instagram", "LinkedIn", "X (Twitter)"]

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
        {PLATFORMS.map((platform) => {
          const isSelected = data.platforms.includes(platform)
          return (
            <Card
              key={platform}
              onClick={() => togglePlatform(platform)}
              className={clsx(
                "cursor-pointer hover:border-primary transition-colors",
                isSelected && "border-primary bg-muted"
              )}
            >
              <CardContent className="p-4 text-center font-medium">
                {platform}
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
