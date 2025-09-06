"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

type QuizQuestionProps = {
  question: string
  options: Array<{ value: string; label: string }>
  type: "single" | "multiple"
  value: any
  onChange: (value: any) => void
  onNext: () => void
  onBack: () => void
  showBack: boolean
}

export default function QuizQuestion({
  question,
  options,
  type,
  value,
  onChange,
  onNext,
  onBack,
  showBack,
}: QuizQuestionProps) {
  const handleOptionClick = (optionValue: string) => {
    if (type === "single") {
      onChange(optionValue)
    } else {
      const currentValues = value || []
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter((v: string) => v !== optionValue))
      } else {
        onChange([...currentValues, optionValue])
      }
    }
  }

  const isSelected = (optionValue: string) => {
    if (type === "single") {
      return value === optionValue
    } else {
      return value && value.includes(optionValue)
    }
  }

  const canProceed = type === "single" ? value : value && value.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center leading-tight">{question}</h2>

        <div className="space-y-3 mb-6">
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.value)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                isSelected(option.value)
                  ? "border-red-500 bg-red-500/10 text-white"
                  : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600 hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                    isSelected(option.value) ? "border-red-500 bg-red-500" : "border-gray-500"
                  }`}
                >
                  {isSelected(option.value) && <div className="w-full h-full rounded-full bg-white scale-50" />}
                </div>
                <span className="text-sm md:text-base">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          {showBack ? (
            <button
              onClick={onBack}
              className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              canProceed ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
