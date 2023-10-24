import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { redirect } from "next/navigation";

async function searchProducts(formData: FormData) {
    'use server'

    const searchQuery = formData.get('searchQuery')?.toString()

    if (searchQuery) {
        redirect('/search?query=' + searchQuery)
    }
}

export function Navbar() {
    return (
        <nav className="bg-zinc-100">
            <div className="max-w-7xl flex flex-col sm:flex-row items-center m-auto gap-2 p-2">
                <div className="flex-1">
                    <Link
                        href='/'
                        className={buttonVariants({
                            variant: 'ghost',
                            className: 'gap-2 hover:bg-zinc-50 text-xl normal-case'
                        })}
                    >
                        <Image
                            src='/next.svg'
                            alt="Logo"
                            height={80}
                            width={80}
                        />
                        Ecommerce
                    </Link>
                </div>

                <div className="flex-none gap-2">
                    <form
                        action={searchProducts}
                    >
                        <div>
                            <Input
                                name="searchQuery"
                                placeholder="Pesquisar"
                                className="min-w-[100px] w-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    )
}
