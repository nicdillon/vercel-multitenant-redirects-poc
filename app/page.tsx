import { headers } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant') || 'default'
  const host = headersList.get('host') || 'unknown'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Multi-Tenant Redirect POC
          </h1>

          <div className="bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Current Tenant: <span className="font-mono bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">{tenant}</span>
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
              Host: {host}
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How This Works
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This POC demonstrates <strong>domain-specific redirects</strong> in a multi-tenant Next.js application on Vercel.
              The middleware detects which tenant domain you are accessing and applies redirects accordingly.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Test the Redirects:
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">
                  Tenant 1 ({tenant === 'tenant1' ? 'YOU ARE HERE' : 'Not Active'})
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <Link href="/company" className="text-blue-600 hover:underline">
                      /company
                    </Link>
                    {' → '}redirects to /about
                  </li>
                  <li>
                    <Link href="/about" className="text-blue-600 hover:underline">
                      /about
                    </Link>
                    {' → '}no redirect (destination page)
                  </li>
                  <li>
                    <Link href="/old-page" className="text-blue-600 hover:underline">
                      /old-page
                    </Link>
                    {' → '}redirects to /new-page
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                  Tenant 2 ({tenant === 'tenant2' ? 'YOU ARE HERE' : 'Not Active'})
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <Link href="/company" className="text-blue-600 hover:underline">
                      /company
                    </Link>
                    {' → '}NO redirect (works normally)
                  </li>
                  <li>
                    <Link href="/contact" className="text-blue-600 hover:underline">
                      /contact
                    </Link>
                    {' → '}redirects to /support
                  </li>
                  <li>
                    <Link href="/about" className="text-blue-600 hover:underline">
                      /about
                    </Link>
                    {' → '}no redirect (works normally)
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
              <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">
                Key Insight for Customer Question:
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Vercel redirects in <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">next.config.ts</code> or <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">vercel.json</code> apply to ALL domains.
                To achieve domain-specific redirects, you need to handle them in <strong>middleware.ts</strong> (as shown here)
                or build it into your CMS/backend logic.
              </p>
            </div>

            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Testing Locally:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Add to your <code>/etc/hosts</code> file:
                  <pre className="bg-gray-800 text-gray-100 p-2 rounded mt-2 overflow-x-auto text-xs">
                    127.0.0.1 tenant1.localhost{'\n'}127.0.0.1 tenant2.localhost
                  </pre>
                </li>
                <li>Run: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">npm run dev</code></li>
                <li>Visit:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li><a href="http://tenant1.localhost:3000" className="text-blue-600 hover:underline">http://tenant1.localhost:3000</a></li>
                    <li><a href="http://tenant2.localhost:3000" className="text-blue-600 hover:underline">http://tenant2.localhost:3000</a></li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
