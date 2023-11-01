import { FormSubmitButton } from "@/components/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { stripe } from "@/lib/stripe";

export const metadata = {
    title: "Adc Produto - Ecommerce"
}

async function addProduct(formData: FormData) {
    "use server"
    
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product')
    }

    const name = formData.get("name")?.toString()
    const description = formData.get("description")?.toString()
    const imageUrl = formData.get("imageUrl")?.toString()
    const price = Number(formData.get("price") || 0)

    if (!name || !description || !imageUrl) {
        throw Error("Campos necessários estão faltando")
    }

    const prismaProduct = await prisma.product.create({
        data: {
            name,
            description,
            imageUrl,
            price
        }
    })

    await stripe.products.create({
        id: prismaProduct.id,
        name,
        description,
        default_price_data: {
            currency: "BRL",
            unit_amount: price
        },
        images: [
            imageUrl
        ]
    })

    redirect("/")
}

export default async function page() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product')
    }

    return (
        <div>
            <h1 className="mb-3 text-lg font-bold">
                Add Product
            </h1>

            <form action={addProduct}>
                <Input
                    required
                    name="name"
                    placeholder="Nome"
                    className="mb-3"
                />

                <Textarea
                    required
                    name="description"
                    placeholder="Descrição"
                    className="mb-3"
                />

                <Input
                    required
                    name="imageUrl"
                    placeholder="Image URL"
                    type="url"
                    className="mb-3"
                />

                <Input
                    required
                    name="price"
                    placeholder="Preço"
                    type="number"
                    className="mb-3"
                />

                <FormSubmitButton
                    className="w-full"
                >
                    Adc Produto
                </FormSubmitButton>
            </form>
        </div>
    )
}
