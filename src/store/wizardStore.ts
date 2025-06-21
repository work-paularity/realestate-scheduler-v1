// src/store/wizardStore.ts
import { create } from "zustand"

type WizardData = {
    platforms: string[]
    trigger: string
    schedule: string
}

type WizardStore = {
    step: number
    data: WizardData
    setStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    updateData: (newData: Partial<WizardData>) => void
    reset: () => void
}

export const useWizardStore = create<WizardStore>((set) => ({
    step: 1,
    data: {
        platforms: [],
        trigger: "",
        schedule: "",
    },
    setStep: (step) => set({ step }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
    updateData: (newData) =>
        set((state) => ({
            data: { ...state.data, ...newData },
        })),
    reset: () =>
        set({
            step: 1,
            data: {
                platforms: [],
                trigger: "",
                schedule: "",
            },
        }),
}))
