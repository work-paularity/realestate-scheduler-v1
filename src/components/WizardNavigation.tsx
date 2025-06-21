import { useWizardStore } from "@/store/wizardStore"
import clsx from "clsx"
import { Check } from "lucide-react"

const steps = [
  "Choose Platforms",
  "Choose Trigger",
  "Define Schedule",
  "Review & Confirm",
]

export function WizardNavigation() {
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
                "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
                "border transition-colors",
                isCompleted && "bg-primary text-white border-primary",
                isActive && !isCompleted && "text-primary border-primary bg-primary/10",
                !isActive && !isCompleted && "text-gray-500 border-gray-700"
              )}
            >
              <span className={clsx(
                "w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold",
                isCompleted ? "bg-white text-primary" : "bg-gray-600 text-white"
              )}>
                {isCompleted ? <Check size={12} /> : stepNumber}
              </span>
              {label}
            </div>

            {index < steps.length - 1 && (
              <div className="text-gray-600 text-sm opacity-60">→</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
