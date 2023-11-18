import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

 
function SkeletonVCard() {
  return (
    <Card className="px-6 py-2 mx-auto">
        <Skeleton className="w-[230px] h-[230px] rounded-sm my-6" />
        <div className="flex flex-col items-center">
        <Skeleton className="w-1/2 h-[20px] rounded-full my-2" />
        <Skeleton className="w-3/4 h-[20px] rounded-full my-2" />
        <Skeleton className="w-1/2 h-[20px] rounded-full my-2" />
        </div>
    </Card>
  )
}

export default SkeletonVCard
