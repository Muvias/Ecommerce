import Link from "next/link";

export function Footer() {
    return (
        <footer className="flex flex-col sm:flex-row gap-6 sm:gap-0 sm:justify-around p-10 bg-primary text-primary-foreground text-sm">
            <nav className="flex flex-col gap-2">
                <header className="text-muted-foreground font-extrabold uppercase">Services</header>
                <Link href='/' className="w-fit">Branding</Link>
                <Link href='/' className="w-fit">Design</Link>
                <Link href='/' className="w-fit">Marketing</Link>
                <Link href='/' className="w-fit">Advertisement</Link>
            </nav>
            <nav className="flex flex-col gap-2">
                <header className="text-muted-foreground font-extrabold uppercase">Company</header>
                <Link href='/' className="w-fit">About us</Link>
                <Link href='/' className="w-fit">Contact</Link>
                <Link href='/' className="w-fit">Jobs</Link>
                <Link href='/' className="w-fit">Press kit</Link>
            </nav>
            <nav className="flex flex-col gap-2">
                <header className="text-muted-foreground font-extrabold uppercase">Legal</header>
                <Link href='/' className="w-fit">Terms of use</Link>
                <Link href='/' className="w-fit">Privacy policy</Link>
                <Link href='/' className="w-fit">Cookie policy</Link>
            </nav>
        </footer>
    )
}
