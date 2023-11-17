import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

function SkeletonHCard() {
    return (
        <Card className="px-6 rounded-sm shadow-md border border-gray-100 ">
            <div className="flex flex-row">
                <div>
                <Skeleton className="w-[150px] h-[160px] rounded-sm my-6 mr-4" />
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                    <Skeleton className="w-full h-[20px] rounded-full my-2" />
                    <Skeleton className="w-3/4 h-[20px] rounded-full my-2" />
                    <div className="flex w-full flex-row justify-around mt-10">
                    <Skeleton className="w-[80px] h-[20px] rounded-full mr-6" />
                    <Skeleton className="w-[90px] h-[40px] rounded-sm" />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default SkeletonHCard