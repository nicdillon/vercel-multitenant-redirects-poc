import { headers } from 'next/headers'
import Link from 'next/link'

export default async function SupportPage() {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant') || 'default'

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Support Page
          </h1>

          <div className="bg-cyan-100 dark:bg-cyan-900 border-l-4 border-cyan-500 p-4 mb-6">
            <p className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">
              Current Tenant: <span className="font-mono bg-cyan-200 dark:bg-cyan-800 px-2 py-1 rounded">{tenant}</span>
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Welcome to the Support page!
            </h2>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-4 mb-6">
              <p className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                Redirect Target for Tenant 2
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                When accessing Tenant 2 domain at <code>/contact</code>, users are automatically
                redirected here to <code>/support</code>. This shows how different tenants can have
                completely different redirect rules.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Testing the Redirect:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Make sure you are accessing the Tenant 2 domain (tenant2.localhost:3000 or tenant2domain.com)</li>
                <li>Try to visit <Link href="/contact" className="text-blue-600 hover:underline">/contact</Link></li>
                <li>You should be automatically redirected back to this page (/support)</li>
              </ol>
            </div>

            <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Note:</strong> For Tenant 1 and other domains, /support works normally and /contact does not redirect here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
