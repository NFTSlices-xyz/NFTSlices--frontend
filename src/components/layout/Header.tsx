import { ReactNode } from 'react'

export const Header = ({ action }: { action?: ReactNode }) => {
  return (
    <div className="bg-black h-16 border-b-1 border-white box-border">
      <div className="max-w-6xl m-auto h-full flex justify-between items-center sm:px-8 lt-sm:px-4">
        <div className="flex items-center font-bold cursor-pointer">
          <span className="text-xl text-white">Slice and Flow</span>
        </div>
        <div className="flex items-center gap-2">{action}</div>
      </div>
    </div>
  )
}
