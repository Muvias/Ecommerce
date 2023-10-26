'use client'

import { MoreHorizontalIcon, UserIcon } from "lucide-react"
import { Session } from "next-auth"
import { signIn, signOut } from 'next-auth/react'
import Image from "next/image"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface UserMenuButtonProps {
    session: Session | null
}

export function UserMenuButton({ session }: UserMenuButtonProps) {
    const user = session?.user

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full hover:bg-zinc-100">
                <DropdownMenuLabel>
                    {user ? (
                        <>
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt='Sua foto de perfil'
                                    width={40}
                                    height={40}
                                    className="rounded-full w-8"
                                />
                            ) : (
                                <UserIcon />
                            )}
                        </>
                    ) : (
                        <MoreHorizontalIcon />
                    )}
                </DropdownMenuLabel>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="rounded-full">
                <DropdownMenuItem asChild>
                    {user ? (
                        <Button
                            variant={'ghost'}
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full justify-start rounded-full focus-visible:ring-zinc-500"
                        >
                            Sair
                        </Button>
                    ) : (
                        <Button
                            variant={'ghost'}
                            onClick={() => signIn('google')}
                            className="w-full justify-start rounded-full focus-visible:ring-zinc-500"
                        >
                            Entrar
                        </Button>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
