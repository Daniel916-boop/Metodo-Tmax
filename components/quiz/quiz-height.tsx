"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

type QuizHeightProps = {
  value: number | null
  onChange: (value: number) => void
  onNext: () => void
  onBack: () => void
}

export default function QuizHeight({ value, onChange, onNext, onBack }: QuizHeightProps) {
  const [inputValue, setInputValue] = useState(value?.toString() || "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)

    const numValue = Number.parseInt(val)
    if (!isNaN(numValue) && numValue > 0 && numValue <= 50) {
      onChange(numValue)
    }
  }

  const canProceed = value && value > 0 && value <= 50

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center leading-tight">
          ¿Cuál es el tamaño actual de tu lápiz en erección?
        </h2>

        <div className="mb-6">
          <div className="relative">
            <input
              type="number"
              min="1"
              max="50"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ingresa el tamaño en cm"
              className="w-full p-4 text-center text-2xl font-bold bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">cm</div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-3">Ingresa un valor entre 1 y 50 centímetros</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-gray-300 text-sm text-center">
            <span className="text-red-500 font-bold">Importante:</span> Esta información es completamente confidencial y
            se utiliza únicamente para crear tu protocolo personalizado.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </button>

          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              canProceed ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Analizar Resultados
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
