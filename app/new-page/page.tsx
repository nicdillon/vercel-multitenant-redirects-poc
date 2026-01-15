import { headers } from 'next/headers'
import Link from 'next/link'

export default async function NewPage() {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant') || 'default'

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            New Page
          </h1>

          <div className="bg-indigo-100 dark:bg-indigo-900 border-l-4 border-indigo-500 p-4 mb-6">
            <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
              Current Tenant: <span className="font-mono bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded">{tenant}</span>
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              This is the new page location
            </h2>

            <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4 mb-6">
              <p className="text-purple-900 dark:text-purple-100 font-semibold mb-2">
                Another Redirect Example for Tenant 1
              </p>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                This demonstrates that you can have multiple redirects per tenant.
                For Tenant 1, <code>/old-page</code> redirects to this <code>/new-page</code>.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 dark:text-gray-300">
                Try visiting <Link href="/old-page" className="text-blue-600 hover:underline">/old-page</Link> while on Tenant 1 domain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
