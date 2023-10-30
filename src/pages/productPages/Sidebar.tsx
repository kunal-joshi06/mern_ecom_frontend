import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getAllProductsAsync } from '../../store/features/products/productSlice';
import { useEffect, useState } from "react";

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
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const { page, limit } = useAppSelector((store) => store.products);
    useEffect(() => {
        const queryParams: {
            page?: string;
            filterBy?: string[];
            limit?: string
        } = {
            page: page.toString(),
            filterBy: selectedCategory,
            limit: limit.toString()
        };

        dispatch(getAllProductsAsync(queryParams))

    }, [dispatch, limit, page, selectedCategory])

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory((prevSelectedCategories) => [...prevSelectedCategories, category]);
    }

    const handleUncheckedCategoryFilter = (category: string) => {
        setSelectedCategory((prevSelectedCategories) =>
            prevSelectedCategories.filter((item) => item !== category)
        );
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