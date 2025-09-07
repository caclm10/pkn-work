import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import type { AppLayoutProps } from "@/types/app";

import "@/app/globals.css";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "PKN Work",
	description: "Simplified PKN work",
};

function RootLayout({ children }: AppLayoutProps) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} antialiased`}>
				<div className="container mx-auto max-w-7xl px-5 py-8">
					{children}
				</div>

				<Toaster />
			</body>
		</html>
	);
}

export default RootLayout;
