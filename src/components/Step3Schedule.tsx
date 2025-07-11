import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useWizardStore } from "@/store/wizardStore"
import { simulateAsync } from "@/lib/fakeApi"
import { toast } from "sonner"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

const OPTIONS = [
  { value: "immediately", label: "Immediately after trigger" },
  { value: "1hour", label: "1 hour after trigger" },
  { value: "nextday", label: "Next business day" },
]

export const Step3Schedule = () => {
  const { data, updateData, nextStep, prevStep } = useWizardStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!data.schedule) {
      setError("Please select a posting schedule.")
      return
    }

    try {
      setLoading(true)
      await simulateAsync(true, 1500, 0.2)
      nextStep()
    } catch {
      toast.error("Failed to save schedule. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (value: string) => {
    updateData({ schedule: value })
    setError("")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Step 3: Define Posting Schedule</h2>

      <div>
        <Select value={data.schedule} onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a schedule" />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
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
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>Next <ArrowRight className="w-4 h-4" /></>
          )}
        </Button>
      </div>
    </div>
  )
}
