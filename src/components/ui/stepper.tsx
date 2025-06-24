"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, User, Calendar, CreditCard } from "lucide-react"

interface Step {
  id: number
  label: string
  icon: React.ElementType
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mb-12">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = step.id < currentStep

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <motion.div
                animate={isActive || isCompleted ? "active" : "inactive"}
                className="relative flex items-center justify-center w-12 h-12 rounded-full border-2"
                variants={{
                  active: {
                    backgroundColor: isCompleted ? "#34D399" : "#60A5FA",
                    borderColor: isCompleted ? "#34D399" : "#60A5FA",
                    color: "#FFFFFF",
                  },
                  inactive: {
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                    color: "#9CA3AF",
                  },
                }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </AnimatePresence>
              </motion.div>
              <p
                className={`mt-2 text-sm font-medium ${
                  isActive || isCompleted ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 bg-gray-200 rounded">
                <motion.div
                  className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Stepper 