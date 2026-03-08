import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
    title: 'Noor Boutique',
    description: 'Elegant Frocks for Every Occasion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
