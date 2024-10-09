import { toast, useToast as useToastOriginal } from "@/components/ui/toast"

export { toast, useToast as useToastOriginal }

export const useToast = () => {
  return {
    toast: useToastOriginal(),
  }
}