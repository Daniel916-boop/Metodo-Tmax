"use client"

import React, { useEffect, useState } from 'react';

const OfferBar: React.FC = () => {
  // Inicializar com 2 horas (7200 segundos)
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 horas em segundos

  useEffect(() => {
    // Se o tempo acabou, não fazer nada
    if (timeLeft <= 0) return;

    // Configurar o intervalo para decrementar a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Converter segundos para horas, minutos e segundos
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-red-600 text-white text-center py-2 text-sm font-bold relative">
      <p className="mb-1">
        ¡OFERTA RELÁMPAGO: 60% DE DESCUENTO! Termina en: {' '}
        <span className="font-mono text-lg">
          {timeLeft > 0 ? formatTime(timeLeft) : '¡Tiempo agotado!'}
        </span>
      </p>
      <p className="text-xs opacity-80">¡Esta oferta ha estado activa durante 2 semanas y hoy es el último día!</p>
    </div>
  );
};

export default OfferBar;


