"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, Clock, Star } from "lucide-react"

export default function PlanosPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos em segundos

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const checkoutUrl = "https://pay.hotmart.com/L101274511Q?checkoutMode=10"

  const handleCheckout = () => {
    window.open(checkoutUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Barra superior com cronômetro */}
        <div className="bg-red-600 text-white p-4 rounded-lg mb-8 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-lg">OFERTA LIMITADA</span>
            </div>
            <div className="text-3xl font-mono font-bold">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm">
              ¡Solo por hoy con 67% de descuento!
            </div>
          </div>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Acceso Completo al Método Tmax</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Aumenta tu testosterona naturalmente con nuestro protocolo científicamente comprobado
          </p>
        </motion.div>

        {/* Tabela de Preços */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Plano Básico */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Plan Básico</h3>
                <div className="text-gray-400 line-through text-lg">$297</div>
                <div className="text-3xl font-bold text-white">$97</div>
                <div className="text-red-400 text-sm">67% de descuento</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Protocolo Método Tmax básico
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Rutina de ejercicios
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Plan nutricional
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Soporte por email
                </li>
              </ul>
              <button
                onClick={handleCheckout}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Elegir Plan Básico
              </button>
            </div>

            {/* Plano Premium - Destacado */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-1 rounded-2xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  MÁS POPULAR
                </div>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Plan Premium</h3>
                  <div className="text-gray-400 line-through text-lg">$597</div>
                  <div className="text-4xl font-bold text-white">$197</div>
                  <div className="text-red-400 text-sm">67% de descuento</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Protocolo completo Método Tmax
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Rutina de ejercicios avanzada
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Plan nutricional personalizado
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Suplementación recomendada
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Soporte 24/7 por WhatsApp
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Comunidad privada
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Garantía de 30 días
                  </li>
                </ul>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105"
                >
                  ELEGIR PLAN PREMIUM
                </button>
              </div>
            </div>

            {/* Plano VIP */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Plan VIP</h3>
                <div className="text-gray-400 line-through text-lg">$897</div>
                <div className="text-3xl font-bold text-white">$297</div>
                <div className="text-red-400 text-sm">67% de descuento</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Todo del Plan Premium
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Consulta 1-a-1 personalizada
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Protocolo 100% personalizado
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Acompañamiento semanal
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Acceso prioritario
                </li>
              </ul>
              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition-all"
              >
                Elegir Plan VIP
              </button>
            </div>
          </div>
        </motion.div>

        {/* Valor Final Destacado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-1 rounded-2xl">
            <div className="bg-gray-900 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¡OFERTA ESPECIAL DE HOY!
              </h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-gray-400 line-through text-2xl">$597</div>
                <div className="text-5xl font-bold text-white">$197</div>
              </div>
              <div className="text-red-400 text-xl font-bold mb-6">
                ¡Ahorras $400 hoy!
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105 shadow-lg"
              >
                AUMENTAR MI TESTOSTERONA AHORA
              </button>
              <p className="text-gray-400 text-sm mt-4">
                Pago seguro procesado por Hotmart • Garantía de 30 días
              </p>
            </div>
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">Garantía de Resultados en 30 Días</h3>
            <p className="text-gray-400">
              Si no sientes un aumento significativo en tu energía, libido y vitalidad, te devolvemos el 100% de tu
              dinero.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

