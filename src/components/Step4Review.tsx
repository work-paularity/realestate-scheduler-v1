import { Button } from "@/components/ui/button"
import { useWizardStore } from "@/store/wizardStore"
import { simulateAsync } from "@/lib/fakeApi"
import { toast } from "sonner"
import { useState } from "react"

export function Step4Review() {
  const { data, prevStep, reset } = useWizardStore()
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await simulateAsync(true, 2000, 0.1) // 2s delay, 10% fail
      toast.success("Automation rule created successfully.")
      reset()
    } catch (err) {
      toast.error("Failed to finalize automation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getLabel = (val: string) => {
    switch (val) {
      case "immediately": return "Immediately after trigger"
      case "1hour": return "1 hour after trigger"
      case "nextday": return "Next business day"
      default: return val
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Step 4: Review & Confirm</h2>

      <div className="border p-4 rounded-md space-y-2 text-sm bg-muted/30">
        <div><strong>Platforms:</strong> {data.platforms.join(", ")}</div>
        <div><strong>Trigger:</strong> {data.trigger}</div>
        <div><strong>Schedule:</strong> {getLabel(data.schedule)}</div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={loading}>
          Previous
        </Button>
        <Button onClick={handleConfirm} disabled={loading}>
          {loading ? "Saving..." : "Confirm"}
        </Button>
      </div>
    </div>
  )
}
