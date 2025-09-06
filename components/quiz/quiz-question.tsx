"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

type QuizQuestionProps = {
  question: string
  options: Array<{ value: string; label: string }>
  type: "single" | "multiple" | "text"
  value: any
  onChange: (value: any) => void
  onNext: () => void
  onBack: () => void
  showBack: boolean
  showTable?: boolean
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
  showTable,
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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const isSelected = (optionValue: string) => {
    if (type === "single") {
      return value === optionValue
    } else {
      return value && value.includes(optionValue)
    }
  }

  const canProceed = () => {
    if (type === "text") {
      return value && value.trim().length > 0
    }
    return type === "single" ? value : value && value.length > 0
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center leading-tight">{question}</h2>

        {showTable && (
          <div className="mb-6 p-2 sm:p-4 bg-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 text-center">Tu Oferta Personalizada</h3>
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <div className="min-w-[320px] px-2 sm:px-0">
                <table className="w-full text-left text-gray-300 text-xs">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium">PROTOCOLO</th>
                      <th className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium">AUMENTO</th>
                      <th className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium">VALOR</th>
                      <th className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium">DESCUENTO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium">400%</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs">4.0 cm</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-red-500 font-bold text-xs">$7</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs">
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500">$17.50</span>
                          <span className="text-green-400">(60% OFF)</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium">100%</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs">2.0 cm</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-red-500 font-bold text-xs">$6</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs">
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500">$15.00</span>
                          <span className="text-green-400">(60% OFF)</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium">50%</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs">1.0 cm</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-red-500 font-bold text-xs">$5</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs">
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500">$12.50</span>
                          <span className="text-green-400">(60% OFF)</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium">25%</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs">0.5 cm</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-red-500 font-bold text-xs">$4</td>
                      <td className="py-1.5 px-1 sm:py-2 sm:px-2 text-xs">
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500">$10.00</span>
                          <span className="text-green-400">(60% OFF)</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {type === "text" ? (
          <div className="mb-6">
            <input
              type="text"
              value={value || ""}
              onChange={handleTextChange}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
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
        )}

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
            disabled={!canProceed()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              canProceed() ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
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
