import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"
import { useAppDispatch } from "../../store/hooks"
import { removeCategory, setCategory } from '../../store/features/products/productSlice';

export default function Sidebar(className: React.HTMLAttributes<HTMLDivElement>) {
    const filters = [
        {
            id: 'category',
            name: 'Category',
            options: [
                { value: 'clothing' },
                { value: 'sports' },
                { value: 'gaming' },
                { value: 'accessories' },
            ],
        },
    ]
    const dispatch = useAppDispatch();

    const handleCategoryFilter = (category: string) => {
        dispatch(setCategory(category))
    }

    const handleUncheckedCategoryFilter = (category: string) => {
        dispatch(removeCategory(category))
    }

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {filters.map((section) => (
                            <div key={section.id}>
                                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                    {section.name}
                                </h2>
                                <div className="space-y-2">
                                    {section.options.map((option, optionIdx) => (
                                        <Toggle key={optionIdx} id={`${optionIdx}`} onPressedChange={(pressed) => { pressed ? handleCategoryFilter(option.value) : handleUncheckedCategoryFilter(option.value); }}
                                            className="w-full justify-start">
                                            {option.value}
                                        </Toggle>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}