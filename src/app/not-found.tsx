import { defaultLocale } from "@/i18n/config";

export default function RootNotFound() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${basePath}/${defaultLocale}`} />
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
