import './globals.css'

export const metadata = {
  title: "Smart Calculator - Financial Tools",
  description: "One tool for all your financial calculations including tax, EMI, GST and more.",
  keywords: ["financial calculator", "tax calculator", "EMI calculator", "GST calculator"],
  openGraph: {
    title: "Smart Calculator - Financial Tools",
    description: "One tool for all your financial calculations including tax, EMI, GST and more.",
    url: "https://taxsahi.com",
    siteName: "Smart Calculator",
    images: [
      {
        url: "https://taxsahi.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Calculator - Financial Tools",
    description: "One tool for all your financial calculations including tax, EMI, GST and more.",
    images: ["https://taxsahi.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="viewport" content={metadata.viewport} />
        <meta name="robots" content={metadata.robots} />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
      </head>
      <body>{children}</body>
    </html>
  )
}
