import './globals.css'

export const metadata = {
    title: 'VoteGuard - Secure Voting Portal',
    description: 'Blockchain-based secure voting system with biometric verification',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
