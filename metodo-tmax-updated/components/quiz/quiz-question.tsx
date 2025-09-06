"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useState } from "react"

type QuizQuestionProps = {
  question: string
  options: Array<{
    value: string
    label: string
    percentage?: number
    redirect?: string
  }>
  type: "single" | "text"
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
  const [textInput, setTextInput] = useState(value || "")

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setTextInput(newValue)
    onChange(newValue)
  }

  const canProceed = type === "text" ? textInput.trim().length > 0 : value !== null

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center leading-tight">
          {question}
        </h2>

        {type === "text" ? (
          <div className="mb-6">
            <input
              type="text"
              value={textInput}
              onChange={handleTextChange}
              placeholder="Escribe tu nombre aquí..."
              className="w-full p-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-all duration-200"
              autoFocus
            />
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  value === option.value
                    ? "border-red-500 bg-red-900/30 text-white"
                    : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600 hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                      value === option.value
                        ? "border-red-500 bg-red-500"
                        : "border-gray-500"
                    }`}
                  >
                    {value === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className="text-sm md:text-base">{option.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            {showBack && (
              <button
                onClick={onBack}
                className="flex items-center px-6 py-3 rounded-lg font-medium transition-all bg-gray-700 hover:bg-gray-600 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </button>
            )}
          </div>

          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              canProceed
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
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

