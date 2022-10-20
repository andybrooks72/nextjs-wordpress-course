import Link from "next/link"

export const ButtonLink = ({ destination, label }) => {
    return (
        <Link href={destination}>
            <a className="btn hover:cursor-pointer">
                {label}
            </a>
        </Link>
    )
}