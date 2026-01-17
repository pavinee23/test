import React from "react"
import './styles/globals.css'

export const metadata = {
	title: "K Energy Save - ENERGY YOU CAN TRUST",
	description: "Advanced power-saving technology with proven results. Cut your Electric Bill from day one!",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
			</head>
			<body>
				{children}
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" async></script>
			</body>
		</html>
	)
}
