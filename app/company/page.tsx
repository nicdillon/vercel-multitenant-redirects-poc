import { headers } from 'next/headers'
import Link from 'next/link'

export default async function CompanyPage() {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant') || 'default'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Company Page
          </h1>

          <div className="bg-purple-100 dark:bg-purple-900 border-l-4 border-purple-500 p-4 mb-6">
            <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
              Current Tenant: <span className="font-mono bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">{tenant}</span>
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              You reached the /company page!
            </h2>

            {tenant === 'tenant1' ? (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4">
                <p className="text-red-900 dark:text-red-100 font-semibold">
                  Wait... if you are on Tenant 1, you should NOT see this page!
                </p>
                <p className="text-sm text-red-800 dark:text-red-200 mt-2">
                  For Tenant 1, /company should redirect to /about. If you are seeing this,
                  the redirect might not be working correctly.
                </p>
              </div>
            ) : tenant === 'tenant2' ? (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                <p className="text-green-900 dark:text-green-100 font-semibold">
                  Perfect! Tenant 2 has NO redirect for /company
                </p>
                <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                  This demonstrates that the /company path works normally for Tenant 2,
                  while it would redirect for Tenant 1.
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 border-2 border-gray-400 rounded-lg p-4">
                <p className="text-gray-900 dark:text-gray-100">
                  You are on the default tenant. This page works normally.
                </p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Understanding the Behavior:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Tenant 1:</strong> /company → redirects to /about (308 permanent redirect)</li>
                <li><strong>Tenant 2:</strong> /company → works normally (no redirect)</li>
                <li><strong>Other domains:</strong> /company → works normally (no redirect)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
