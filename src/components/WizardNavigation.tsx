import { useWizardStore } from "@/store/wizardStore"
import clsx from "clsx"
import { ArrowLeft, ChevronRight } from "lucide-react"

const steps = [
  "Choose Platforms",
  "Choose Trigger",
  "Define Schedule",
  "Review & Confirm",
]

export const WizardNavigation = () => {
  const current = useWizardStore((s) => s.step)

  return (
    <div className="flex items-center gap-3 mb-8">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isCompleted = current > stepNumber
        const isActive = current === stepNumber

        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={clsx(
                "flex items-center text-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
                "border transition-colors",
                isCompleted && "bg-blue-500 text-white border-primary",
                isActive && !isCompleted && "text-primary border-primary bg-primary/10",
                !isActive && !isCompleted && "text-gray-500 border-gray-700"
              )}
            >
              {label}
            </div>

            {index < steps.length - 1 && (
              <div className="text-gray-600 text-sm opacity-60"><ChevronRight /></div>
            )}
          </div>
        )
      })}
    </div>
  )
}
