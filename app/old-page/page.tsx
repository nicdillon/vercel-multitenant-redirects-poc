import { headers } from 'next/headers'
import Link from 'next/link'

export default async function OldPage() {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant') || 'default'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Old Page
          </h1>

          <div className="bg-gray-100 dark:bg-gray-700 border-l-4 border-gray-500 p-4 mb-6">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Current Tenant: <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{tenant}</span>
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {tenant === 'tenant1' ? (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4">
                <p className="text-red-900 dark:text-red-100 font-semibold">
                  If you are on Tenant 1, you should have been redirected!
                </p>
                <p className="text-sm text-red-800 dark:text-red-200 mt-2">
                  For Tenant 1, /old-page should redirect to /new-page. If you are seeing this,
                  the redirect might not be working correctly.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                <p className="text-green-900 dark:text-green-100 font-semibold">
                  This old page works normally for this tenant
                </p>
                <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                  Only Tenant 1 has a redirect from this page. Other tenants can access it normally.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
