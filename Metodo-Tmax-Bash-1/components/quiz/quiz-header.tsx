"use client"

import { motion } from "framer-motion"

type QuizHeaderProps = {
  currentStep: number
  totalSteps: number
}

export default function QuizHeader({ currentStep, totalSteps }: QuizHeaderProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="w-full mb-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Diagnóstico <span className="text-red-500">Personalizado</span>
        </h1>
        <p className="text-gray-400">
          Pregunta {currentStep + 1} de {totalSteps}
        </p>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
        <motion.div
          className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-400">{Math.round(progress)}% completado</span>
      </div>
    </div>
  )
}
