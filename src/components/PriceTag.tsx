import { formatPrice } from "@/lib/format"
import { Badge } from "./ui/badge"

interface PriceTagProps {
    price: number
    className?: string
}

export function PriceTag({ price, className }: PriceTagProps) {
    return (
        <Badge variant={"secondary"} className={className}>
            {formatPrice(price)}
        </Badge>
    )
}
