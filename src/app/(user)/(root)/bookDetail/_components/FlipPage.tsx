'use client'

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
        className="flex flex-col bg-gray-600 dark:bg-white w-full md:p-6 px-10 py-2 rounded-md relative"
      >
        {/* Header */}
        <div className="text-center mb-2 md:mb-4">
          <p className="text-sm md:text-base text-gray-300 dark:text-gray-600 font-semibold">
            {title || `Page Header - ${number}`}
          </p>
          <div className="border-t border-gray-300 mt-1" />
        </div>

        {/* Image */}
        {imageSrc && (
          <div className="w-full flex justify-center md:mb-4">
            <img
              src={`data:image/png;base64,${imageSrc}`}
              alt={`Page ${number}`}
              className="w-full h-[350px] md:h-[300px] object-cover rounded-sm"
              sizes="(max-width: 768px), (max-width: 1200px)"
            />
          </div>
        )}

        {/* Content */}
        {
          content && (
            <div className="flex-1 text-justify">
              <div className="h-full overflow-auto pr-1">
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  {content}
                </p>
              </div>
            </div>
          )
        }

        {/* Footer / Page number */}
        <div className="absolute bottom-3 left-10 md:left-4 mt-2 text-right text-gray-400 text-xs">
          <div className="border-t border-gray-300 mt-1 w-full">{number}</div>
        </div>

        <div className="absolute top-0 right-0 w-2 h-full bg-gray-200 rounded-r-md opacity-50 pointer-events-none" />
      </div>
    )
  }
)

FlipPage.displayName = "FlipPage"
