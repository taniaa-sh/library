import LayoutLoading from "@/app/(user)/(root)/_components/LayoutLoading";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-white z-50">
      <LayoutLoading />
    </div>
  )
}