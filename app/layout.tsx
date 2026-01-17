import React from "react"
import Script from 'next/script'
import './styles/globals.css'

export const metadata = {
	title: "K Energy Save - ENERGY YOU CAN TRUST",
	description: "Advanced power-saving technology with proven results. Cut your Electric Bill from day one!",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link 
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
					rel="stylesheet" 
					integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
					crossOrigin="anonymous"
				/>
				<link 
					rel="stylesheet" 
					href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
					crossOrigin="anonymous"
				/>
			</head>
			<body suppressHydrationWarning>
				{children}
				<Script 
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
					crossOrigin="anonymous"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	)
}
