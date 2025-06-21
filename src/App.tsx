import { useWizardStore } from "@/store/wizardStore"
import { WizardNavigation } from "./components/WizardNavigation"
import { Step1Platforms } from "./components/Step1Platforms"
import { Step2Trigger } from "./components/Step2Trigger"
import { Step3Schedule } from "./components/Step3Schedule"
import { Step4Review } from "./components/Step4Review"

const App = () => {
  const step = useWizardStore((s) => s.step)

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4" aria-label="Automation Wizard">
        Automation Wizard
      </h1>

      <WizardNavigation />

      {step === 1 && <Step1Platforms />}
      {step === 2 && <Step2Trigger />}
      {step === 3 && <Step3Schedule />}
      {step === 4 && <Step4Review />}
    </main>
  )
}

export default App
