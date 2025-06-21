import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWizardStore } from "@/store/wizardStore"
import { simulateAsync } from "@/lib/fakeApi"
import { toast } from "sonner"
import { Layers, Zap, Clock, Loader2, CheckCircle, ArrowLeft } from "lucide-react"

export const Step4Review = () => {
  const { data, prevStep, reset } = useWizardStore()
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await simulateAsync(true, 2000, 0.1)
      toast.success("Automation rule created successfully.")
      reset()
    } catch {
      toast.error("Failed to finalize automation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getLabel = (val: string) => {
    switch (val) {
      case "immediately":
        return "Immediately after trigger"
      case "1hour":
        return "1 hour after trigger"
      case "nextday":
        return "Next business day"
      default:
        return val
    }
  }

  const SummaryItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType
    label: string
    value: string
  }) => (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-cyan-950 text-white rounded-full p-2">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base font-medium">{value}</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Step 4: Review & Confirm</h2>

      <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-5 shadow-sm">
        <SummaryItem icon={Layers} label="Platforms" value={data.platforms.join(", ")} />
        <SummaryItem icon={Zap} label="Trigger" value={data.trigger} />
        <SummaryItem icon={Clock} label="Schedule" value={getLabel(data.schedule)} />
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={loading}
        >
          <> <ArrowLeft className="w-4 h-4" />Previous</>
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={loading}
        >
          {
            loading ? (
                <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
                </>
            ) : <>Confirm<CheckCircle className="w-4 h-4" /></>
          }
        </Button>
      </div>
    </div>
  )
}
