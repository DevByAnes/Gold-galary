import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { rehydrateShopStores } from "@/store/shop";

function NotFoundComponent() {
  return (
    <div className="container-page flex min-h-[50vh] items-center justify-center py-16">
      <div className="max-w-md text-center">
        <p className="font-latin text-7xl text-gold">404</p>
        <h1 className="mt-4 text-xl font-bold text-foreground">صفحه مورد نظر پیدا نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">ممکن است این صفحه حذف یا جابه‌جا شده باشد.</p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-gold px-6 text-sm font-semibold text-ink hover:bg-gold-soft"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-foreground">بارگذاری صفحه با مشکل مواجه شد</h1>
        <p className="mt-2 text-sm text-muted-foreground">لطفاً دوباره تلاش کنید یا به صفحه اصلی بازگردید.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gold px-5 text-sm font-semibold text-ink hover:bg-gold-soft"
          >
            تلاش دوباره
          </button>
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium text-foreground hover:bg-accent"
          >
            صفحه اصلی
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Never add og:image or twitter:image here: every page would inherit it.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "گالری طلای رضایی | Rezaei Gold Gallery" },
      { name: "description", content: "فروشگاه آنلاین زیورآلات طلای ۱۸ عیار گالری طلای رضایی." },
      { name: "author", content: "Rezaei Gold Gallery" },
      { name: "theme-color", content: "#211A15" },
      { property: "og:site_name", content: "گالری طلای رضایی" },
      { property: "og:locale", content: "fa_IR" },
      { property: "og:title", content: "گالری طلای رضایی" },
      { property: "og:description", content: "فروشگاه آنلاین زیورآلات طلای ۱۸ عیار." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    rehydrateShopStores();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-card focus:p-3">
        پرش به محتوای اصلی
      </a>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster position="top-center" dir="rtl" toastOptions={{ style: { fontFamily: "var(--font-sans)" } }} />
    </QueryClientProvider>
  );
}
