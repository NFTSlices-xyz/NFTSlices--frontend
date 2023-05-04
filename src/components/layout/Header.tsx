import { ReactNode } from 'react'

export const Header = ({ action }: { action?: ReactNode }) => {
  return (
    <div className="h-16 border-b-1 border-white box-border">
      <div className="max-w-6xl m-auto h-full flex justify-between items-center sm:px-8 lt-sm:px-4">
        <div className="flex items-center font-bold cursor-pointer">
          <span className="text-xl">NFTSlices</span>
          <span className="flex-col-center ml-3 py-.25 px-1.5 text-xs text-#666 bg-white rounded-full font-light"></span>
        </div>
      </div>
    </div>
  )
}
