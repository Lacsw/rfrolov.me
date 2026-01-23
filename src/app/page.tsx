import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  const basePath = process.env.GITHUB_ACTIONS === "true" ? "/rfrolov.me" : "";

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${basePath}/${defaultLocale}`} />
        <link rel="canonical" href={`${basePath}/${defaultLocale}`} />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href="${basePath}/${defaultLocale}";`,
          }}
        />
      </body>
    </html>
  );
}
