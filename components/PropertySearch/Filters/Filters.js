import { Input } from "components/Input"
import { useEffect, useState } from "react"
import queryString from 'query-string'

export const Filters = ({ onSearch }) => {
    const [ petFriendly, setPetFriendly ] = useState(false)
    const [ hasParking, setHasParking ] = useState(false)
    const [ minPrice, setMinPrice ] = useState("")
    const [ maxPrice, setMaxPrice ] = useState("")
    const [ minBedroom, setMinBedroom ] = useState("")
    const [ maxBedroom, setMaxBedroom ] = useState("")

    const handleSearch = () => {
        onSearch({
            petFriendly,
            hasParking,
            minPrice,
            maxPrice,
            minBedroom,
            maxBedroom
        })
    }

    useEffect(() => {
        const { petFriendly: petFriendlyInitial, hasParking: hasParkingInitial, minPrice: minPriceInitial, maxPrice: maxPriceInitial, minBedroom: minBedroomInitial, maxBedroom: maxBedroomInitial } = queryString.parse(window.location.search)

        setPetFriendly(petFriendlyInitial === "true")
        setHasParking(hasParkingInitial === "true")
        setMinPrice(minPriceInitial || "" )
        setMaxPrice(maxPriceInitial || "" )
        setMinBedroom(minBedroomInitial || "" )
        setMaxBedroom(maxBedroomInitial || "" )
    }, [])
    return (
        <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-500 border-2 p-5 rounded-md">
            <div className="flex-1">
                <div>
                    <label className="cursor-pointer">
                        <input type="checkbox" checked={hasParking} onChange={() => setHasParking((value) => !value)} />
                        <span className="pl-2">has parking</span>
                    </label>
                </div>
                <div>
                    <label className="cursor-pointer">
                    <input type="checkbox" checked={petFriendly} onChange={() => setPetFriendly((value) => !value)} />
                        <span className="pl-2">pet friendly</span>
                    </label>
                </div>
            </div>
            <div className="flex-1">
                <span>Min price</span>
                <Input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />

                <span>Min bedrooms</span>
                <Input type="number" value={minBedroom} onChange={(e) => setMinBedroom(e.target.value)} />
            </div>
            <div className="flex-1">
                <span>Max price</span>
                <Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

                <span>Max bedrooms</span>
                <Input type="number" value={maxBedroom} onChange={(e) => setMaxBedroom(e.target.value)} />
            </div>
            <div className="self-end">
                <div className="btn" onClick={handleSearch}>
                    Search
                </div>
            </div>
        </div>
    )
}