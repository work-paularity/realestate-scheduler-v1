import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWizardStore } from "@/store/wizardStore"
import { simulateAsync } from "@/lib/fakeApi"
import { toast } from "sonner"
import clsx from "clsx"
import { useState } from "react"

const TRIGGERS = [
  "New Listing Published",
  "Price Change",
  "Sold Property",
]

export function Step2Trigger() {
  const { data, updateData, nextStep, prevStep } = useWizardStore()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!data.trigger) {
      toast.error("Please select one trigger.")
      return
    }

    try {
      setLoading(true)
      await simulateAsync(true, 1500, 0.2)
      nextStep()
    } catch (err) {
      toast.error("Failed to save trigger. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Step 2: Choose Automation Trigger</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TRIGGERS.map((trigger) => (
          <Card
            key={trigger}
            onClick={() => updateData({ trigger })}
            className={clsx(
              "cursor-pointer hover:border-primary transition-colors",
              data.trigger === trigger && "border-primary bg-muted"
            )}
          >
            <CardContent className="p-4 text-center font-medium">
              {trigger}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={loading}>
          Previous
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  )
}
