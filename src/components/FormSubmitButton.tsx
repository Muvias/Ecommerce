'use client'

import { ComponentProps } from "react"
import { buttonVariants } from "./ui/button"
import { useFormStatus } from 'react-dom'
import { Loader2 } from "lucide-react"

type FormSubmitButtonProps = {
    children: React.ReactNode
    className?: string,
} & ComponentProps<"button">

export function FormSubmitButton({ children, className, ...props }: FormSubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={buttonVariants({ className: `${className}` })}
            {...props}
        >
            {pending ? (
                <Loader2 className="animate-spin" />
            ) : (
                children
            )}
        </button>
    )
}
