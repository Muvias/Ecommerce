export function formatPrice(price: number) {
    return (price / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}