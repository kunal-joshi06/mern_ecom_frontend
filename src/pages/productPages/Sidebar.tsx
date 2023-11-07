import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"
import { useAppDispatch } from "../../store/hooks"
import { Input } from "@/components/ui/input"
import useDebounce from "../../hooks/useDebounce";
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { removeCategory, setCategory, setPriceRange } from '../../store/features/products/productSlice';
import { useEffect, useState } from "react";

export default function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const [categoryOptions, setCategoryOptions] = useState([{ value: 'clothing', pressed: false },
    { value: 'sports', pressed: false },
    { value: 'gaming', pressed: false },
    { value: 'accessories', pressed: false },
    ])
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100000);

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinValue = parseInt(e.target.value, 10);
        if (!isNaN(newMinValue) && newMinValue <= maxValue) {
            setMinValue(newMinValue);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = parseInt(e.currentTarget.value, 10);
        if (!isNaN(newMaxValue) && newMaxValue >= minValue) {
            setMaxValue(newMaxValue);
        }
    };

    const handleSliderChange = (values: number[]) => {
        const [newMinValue, newMaxValue] = values;
        setMinValue(newMinValue);
        setMaxValue(newMaxValue);
    };

    const debouncedValue1 = useDebounce(minValue, 800);
    const debouncedValue2 = useDebounce(maxValue, 800);
    useEffect(() => {

        dispatch(setPriceRange([minValue, maxValue]));

    }, [debouncedValue1, debouncedValue2])


    const dispatch = useAppDispatch();

    const handleCategoryFilter = (index: number) => {
        const updatedCategories = [...categoryOptions];
        updatedCategories[index].pressed = !updatedCategories[index].pressed;
        setCategoryOptions(updatedCategories);
        dispatch(setCategory(categoryOptions[index].value));
    }

    const handleUncheckedCategoryFilter = (index: number) => {
        const updatedCategories = [...categoryOptions];
        updatedCategories[index].pressed = !updatedCategories[index].pressed;
        setCategoryOptions(updatedCategories);
        dispatch(removeCategory(categoryOptions[index].value))
    }

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="category">
                                <AccordionTrigger>Category</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {categoryOptions.map((option, optionIdx) => (
                                            <Toggle key={optionIdx} id={`${optionIdx}`} pressed={option.pressed} onPressedChange={(pressed) => { pressed ? handleCategoryFilter(optionIdx) : handleUncheckedCategoryFilter(optionIdx); }}
                                                className="w-full justify-start">
                                                {option.value}
                                            </Toggle>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="space-y-1 mt-4">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="price">
                                <AccordionTrigger>Price</AccordionTrigger>
                                <AccordionContent>
                                    <div className="px-6">
                                        <RangeSlider aria-label={['min', 'max']} defaultValue={[minValue, maxValue]}
                                            value={[minValue, maxValue]}
                                            min={0} max={100000}
                                            onChange={handleSliderChange}
                                        >
                                            <RangeSliderTrack>
                                                <RangeSliderFilledTrack bgColor=" rgb(244 63 94)" />
                                            </RangeSliderTrack>
                                            <RangeSliderThumb index={0} />
                                            <RangeSliderThumb index={1} />
                                        </RangeSlider>
                                    </div>
                                    <div className="grid grid-rows-1 grid-cols-3 p-2">
                                        <Input className="col-span-1" onChange={handleMinInputChange}
                                            onBlur={() => {
                                                if (minValue > maxValue) {
                                                    setMinValue(maxValue);
                                                }
                                            }}
                                            min={0} type="number" name="minPrice" value={minValue} />
                                        <Input className="col-start-3" onChange={handleMaxInputChange}
                                            onBlur={() => {
                                                if (maxValue < minValue) {
                                                    setMaxValue(minValue);
                                                }
                                            }}
                                            type="number" name="maxPrice" value={maxValue} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}