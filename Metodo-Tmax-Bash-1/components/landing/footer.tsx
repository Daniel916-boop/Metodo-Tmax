"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black pt-16 pb-8 border-t border-[#111111]">
      <div className="container mx-auto px-4">
        <div className="border-t border-[#111111] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#AFAFAF] text-sm text-center">
              © {currentYear} Método Del Lápiz Gigante. Todos los derechos reservados.
            </p>
            <p className="text-[#AFAFAF] text-xs mt-4 md:mt-0 max-w-md text-center md:text-right">
              Este sitio no está afiliado a ninguna empresa farmacéutica o médica. Los resultados pueden variar de
              persona a persona.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
