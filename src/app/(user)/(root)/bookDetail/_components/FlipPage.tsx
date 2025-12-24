'use client'

import Image from "next/image"
import { forwardRef } from "react"

interface FlipPageProps {
  number: number
  title?: string
  imageSrc?: string
  content?: string
}

export const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(
  ({ number, title, imageSrc, content }, ref) => {
    return (
      <div
        ref={ref}
        className="flex flex-col bg-white w-full h-full p-10 md:p-6 rounded-md relative"
      >
        {/* Header */}
        <div className="text-center mb-2 md:mb-4">
          <p className="text-sm md:text-base text-gray-600 font-semibold">
            {title || `Page Header - ${number}`}
          </p>
          <div className="border-t border-gray-300 mt-1"></div>
        </div>

        {/* Image */}
        {imageSrc && (
          <div className="flex justify-center mb-2 md:mb-4">
            <Image
              src={imageSrc}
              alt={`Page ${number}`}
              className="w-full md:w-4/5 h-48 md:h-60 object-cover rounded-sm"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 text-justify">
          <div className="h-full overflow-auto pr-1">
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              {content || "..."}
            </p>
          </div>
        </div>

        {/* Footer / Page number */}
        <div className="absolute bottom-3 left-4 mt-2 text-right text-gray-400 text-xs">
          <div className="border-t border-gray-300 mt-1 w-full"></div>
          <div>{number}</div>
        </div>

        {/* Edge effect */}
        <div className="absolute top-0 right-0 w-2 h-full bg-gray-200 rounded-r-md opacity-50 pointer-events-none"></div>
      </div>
    )
  }
)

FlipPage.displayName = "FlipPage"
