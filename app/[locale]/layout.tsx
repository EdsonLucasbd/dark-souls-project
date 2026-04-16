import { Geist_Mono, Inter, Oxanium } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { TranslationButton } from "@/components/translation-button";
import { cn } from "@/lib/utils";
import { routing } from '@/src/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";

const oxaniumHeading = Oxanium({ subsets: ['latin'], variable: '--font-heading' });

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: 'Dark Souls Compendium',
    description: 'A compendium of knowledge from across the trilogy.',
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, oxaniumHeading.variable)}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <TranslationButton />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
