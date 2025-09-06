"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

type QuizResultProps = {
  currentLevel: number
  desiredIncrease: number
  onContinue: () => void
}

export default function QuizResult({ currentLevel, desiredIncrease, onContinue }: QuizResultProps) {
  const finalLevel = currentLevel + desiredIncrease

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Tu Resultado <span className="text-red-500">Personalizado</span>
          </h1>
          <p className="text-lg text-gray-300">
            Basado en tu análisis, descubrimos tu potencial de optimización hormonal
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 shadow-xl mb-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Puedes aumentar hasta <span className="text-red-500 text-3xl">{desiredIncrease}%</span> tu testosterona
            </h2>
            <p className="text-gray-400 mt-2">Tu nivel hormonal tiene potencial para optimizarse en solo 30 días</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-xl text-center w-full md:w-auto">
              <p className="text-gray-400 mb-1 text-sm">Nivel actual</p>
              <p className="text-2xl font-bold text-white">{currentLevel}%</p>
            </div>

            <div className="hidden md:block">
              <ArrowRight className="h-8 w-8 text-red-500" />
            </div>
            <div className="block md:hidden">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            <div className="bg-gradient-to-r from-red-900 to-red-700 p-4 rounded-xl text-center w-full md:w-auto">
              <p className="text-gray-200 mb-1 text-sm">Tu potencial máximo</p>
              <p className="text-2xl font-bold text-white">{finalLevel}%</p>
            </div>
          </div>

          <div className="relative h-16 bg-gray-800 rounded-lg overflow-hidden mb-6">
            <div 
              className="absolute bottom-0 left-0 bg-gray-700 h-full flex items-center justify-center border-r-2 border-dashed border-white/20"
              style={{ width: `${Math.min(currentLevel, 50)}%` }}
            >
              <span className="text-white font-bold text-lg">{currentLevel}%</span>
            </div>
            <div 
              className="absolute bottom-0 right-0 bg-gradient-to-r from-red-800 to-red-600 h-full flex items-center justify-center"
              style={{ width: `${Math.min(100 - currentLevel, 50)}%` }}
            >
              <span className="text-white font-bold text-lg">{finalLevel}%</span>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
              <ArrowRight className="h-4 w-4 text-red-600" />
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="text-white font-bold mb-3">Resumen de tu análisis:</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Nivel actual de testosterona:</span>
                <span className="text-white font-bold">{currentLevel}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Aumento deseado:</span>
                <span className="text-red-400 font-bold">+{desiredIncrease}%</span>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Nivel objetivo total:</span>
                  <span className="text-green-400 font-bold text-lg">{finalLevel}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg mb-4">
            <div className="flex items-start">
              <div className="bg-red-600 rounded-full p-1 mr-3 mt-1">
                <Check className="h-3 w-3 text-white" />
              </div>
              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">97% de los hombres</span> logran optimizar sus niveles hormonales
                en <span className="font-bold text-white">30 días</span> siguiendo nuestro protocolo.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="flex items-start">
              <div className="bg-red-600 rounded-full p-1 mr-3 mt-1">
                <Check className="h-3 w-3 text-white" />
              </div>
              <p className="text-gray-300 text-sm">
                Tu protocolo personalizado requiere solo{" "}
                <span className="font-bold text-white">15 minutos por día</span> para resultados hormonales efectivos.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={onContinue}
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            Comenzar Mi Protocolo Personalizado
          </button>
          <p className="mt-3 text-gray-400 text-xs">
            Tu protocolo de optimización hormonal fue creado basado en tus respuestas.
            <br />
            Comienza ahora y siente la diferencia en solo 30 días.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

