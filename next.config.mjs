/** @type {import('next').NextConfig} */
const nextConfig = {
  // The project's Supabase integration only provisions SUPABASE_ANON_KEY /
  // SUPABASE_PUBLISHABLE_KEY (no NEXT_PUBLIC_ prefix), but lib/supabase/client.ts,
  // server.ts, and middleware.ts read NEXT_PUBLIC_SUPABASE_ANON_KEY. Alias it here
  // so the browser/client bundle gets the value without requiring a separate env var.
  env: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.SUPABASE_PUBLISHABLE_KEY ||
      "",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure consistent URL handling for webhooks
  // trailingSlash: false means /api/webhooks/resend (no trailing slash)
  trailingSlash: false,
  // Disable automatic trailing slash redirects to prevent 307 issues with webhooks
  // Webhooks (like Resend) send POST to exact URL and don't follow redirects properly
  skipTrailingSlashRedirect: true,
}

export default nextConfig
