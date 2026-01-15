import { headers } from 'next/headers'
import Link from 'next/link'

export default async function ContactPage() {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant') || 'default'

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Page
          </h1>

          <div className="bg-orange-100 dark:bg-orange-900 border-l-4 border-orange-500 p-4 mb-6">
            <p className="text-lg font-semibold text-orange-900 dark:text-orange-100">
              Current Tenant: <span className="font-mono bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">{tenant}</span>
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              You reached the /contact page!
            </h2>

            {tenant === 'tenant2' ? (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4">
                <p className="text-red-900 dark:text-red-100 font-semibold">
                  Hmm... if you are on Tenant 2, you should NOT see this page!
                </p>
                <p className="text-sm text-red-800 dark:text-red-200 mt-2">
                  For Tenant 2, /contact should redirect to /support. If you are seeing this,
                  the redirect might not be working correctly.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                <p className="text-green-900 dark:text-green-100 font-semibold">
                  This page works normally for {tenant === 'tenant1' ? 'Tenant 1' : 'this tenant'}
                </p>
                <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                  Only Tenant 2 has a redirect configured for /contact → /support.
                  All other tenants can access this page normally.
                </p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Understanding the Behavior:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Tenant 2:</strong> /contact → redirects to /support (308 permanent redirect)</li>
                <li><strong>Tenant 1:</strong> /contact → works normally (no redirect)</li>
                <li><strong>Other domains:</strong> /contact → works normally (no redirect)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
