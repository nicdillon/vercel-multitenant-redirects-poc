import { headers } from 'next/headers'
import Link from 'next/link'

export default async function AboutPage() {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant') || 'default'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Page
          </h1>

          <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-lg font-semibold text-green-900 dark:text-green-100">
              Current Tenant: <span className="font-mono bg-green-200 dark:bg-green-800 px-2 py-1 rounded">{tenant}</span>
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Welcome to the About page!
            </h2>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-4 mb-6">
              <p className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                Redirect Target for Tenant 1
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                When accessing Tenant 1 domain at <code>/company</code>, users are automatically
                redirected here to <code>/about</code>. This demonstrates domain-specific redirect logic.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Testing the Redirect:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Make sure you are accessing the Tenant 1 domain (tenant1.localhost:3000 or tenant1domain.com)</li>
                <li>Try to visit <Link href="/company" className="text-blue-600 hover:underline">/company</Link></li>
                <li>You should be automatically redirected back to this page (/about)</li>
              </ol>
            </div>

            <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Note:</strong> For Tenant 2 and other domains, /about works normally without any special redirect behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
