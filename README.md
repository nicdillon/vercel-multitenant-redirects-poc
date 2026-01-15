# Multi-Tenant Domain-Specific Redirects POC

A Next.js proof of concept demonstrating how to implement domain-specific redirects in a multi-tenant application on Vercel.

## The Customer Question

> "The project we have is multi-tenant, so we have one database/backend serving different websites based on domain on the front end (routed through middleware). As an example, if I wanted to redirect tenant1domain.com/company to tenant1domain.com/about, but I didn't want to route tenant2domain.com/company anywhere, could I input the domain & path into the redirect source input?"

## The Answer

**Short answer:** Vercel's built-in redirect configuration (in `next.config.ts` or `vercel.json`) applies redirects to **ALL domains** connected to a project. To achieve domain-specific redirects, you need to implement them in **middleware** (as demonstrated in this POC) or handle them in your CMS/backend logic.

**Why?** When you configure redirects in Vercel's dashboard or config files, they apply globally across all domains pointing to that project. The redirect source field only accepts paths, not domain+path combinations.

## Solution Architecture

This POC demonstrates the recommended approach:

### 1. Middleware-Based Domain Detection
The `middleware.ts` file:
- Detects which tenant/domain is making the request
- Looks up domain-specific redirect rules
- Applies redirects conditionally based on the tenant
- Passes tenant information to your app via headers

### 2. Domain-Specific Redirect Configuration
```typescript
const DOMAIN_REDIRECTS: Record<string, Record<string, string>> = {
  'tenant1': {
    '/company': '/about',      // Only for tenant1
    '/old-page': '/new-page',
  },
  'tenant2': {
    '/contact': '/support',    // Only for tenant2
    // /company is NOT redirected for tenant2
  },
}
```

### 3. Key Benefits
- **Granular control**: Different redirects for different tenants
- **No database required**: Configuration lives in code (can be moved to DB if needed)
- **Edge-executed**: Runs at the Vercel Edge, fast globally
- **SEO-friendly**: Uses proper HTTP redirect codes (308 permanent)

## Project Structure

```
├── middleware.ts              # Domain detection & redirect logic
├── app/
│   ├── page.tsx              # Homepage with tenant detection
│   ├── company/page.tsx      # Redirects for tenant1 only
│   ├── about/page.tsx        # Redirect target for tenant1
│   ├── contact/page.tsx      # Redirects for tenant2 only
│   ├── support/page.tsx      # Redirect target for tenant2
│   ├── old-page/page.tsx     # Another tenant1 redirect example
│   └── new-page/page.tsx     # Redirect target
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Local Development

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up local domain testing (optional but recommended):**

Edit your `/etc/hosts` file (macOS/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
```
127.0.0.1 tenant1.localhost
127.0.0.1 tenant2.localhost
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Test the redirects:**
- **Tenant 1:** http://tenant1.localhost:3000
  - Visit `/company` → redirects to `/about`
  - Visit `/old-page` → redirects to `/new-page`

- **Tenant 2:** http://tenant2.localhost:3000
  - Visit `/company` → works normally (no redirect)
  - Visit `/contact` → redirects to `/support`

## Deploying to Vercel

### 1. Connect Multiple Domains

In your Vercel project settings:
1. Go to **Settings** → **Domains**
2. Add all your tenant domains:
   - `tenant1domain.com`
   - `tenant2domain.com`
   - (and any other tenant domains)

### 2. Update Middleware

Edit `middleware.ts` to include your production domains:
```typescript
const TENANT_DOMAINS = {
  // Local development
  'tenant1.localhost:3000': 'tenant1',
  'tenant2.localhost:3000': 'tenant2',

  // Production domains
  'tenant1domain.com': 'tenant1',
  'www.tenant1domain.com': 'tenant1',
  'tenant2domain.com': 'tenant2',
  'www.tenant2domain.com': 'tenant2',
}
```

### 3. Deploy

```bash
# Using Vercel CLI
vercel

# Or push to GitHub/GitLab and connect via Vercel dashboard
git push origin main
```

## How It Works

### Request Flow

1. **User visits** `tenant1domain.com/company`
2. **Middleware executes** at the edge:
   - Detects hostname: `tenant1domain.com`
   - Maps to tenant: `tenant1`
   - Checks redirect rules for tenant1
   - Finds: `/company` → `/about`
   - Returns 308 redirect response
3. **Browser redirects** to `tenant1domain.com/about`
4. **Page renders** normally

### For tenant2domain.com/company:
1. User visits `tenant2domain.com/company`
2. Middleware detects tenant: `tenant2`
3. Checks redirect rules for tenant2
4. **No redirect found for `/company`**
5. Request continues normally
6. `/company` page renders

## Alternative Approaches

### 1. CMS-Based Redirects
If you prefer managing redirects in your CMS:
- Store redirect rules in your database
- Fetch them in middleware
- Apply same logic shown here

Pros:
- Non-technical users can manage redirects
- No code deployments needed for redirect changes

Cons:
- Database query on every request (can be cached)
- More complex setup

### 2. Vercel Edge Config
For frequently changing redirects without deployments:
- Store redirects in Vercel Edge Config
- Read in middleware
- Ultra-fast, globally distributed

```typescript
import { get } from '@vercel/edge-config';

export async function middleware(request: NextRequest) {
  const redirects = await get('tenant_redirects');
  // Apply redirect logic
}
```

### 3. Separate Projects Per Tenant
If tenants are very different:
- Deploy separate Vercel projects
- Use Vercel's native redirect config per project

Pros:
- Simplest redirect configuration
- Complete isolation

Cons:
- Code duplication
- More complex to maintain

## Customization

### Adding New Tenants

In `middleware.ts`, add to `TENANT_DOMAINS`:
```typescript
const TENANT_DOMAINS = {
  'tenant3domain.com': 'tenant3',
  // ...
}
```

And add redirect rules if needed:
```typescript
const DOMAIN_REDIRECTS = {
  'tenant3': {
    '/custom-path': '/new-path',
  },
}
```

### Changing Redirect Type

The POC uses **308 Permanent Redirect**. To change:
```typescript
// 307 Temporary Redirect
return NextResponse.redirect(redirectUrl, 307)

// 301 Permanent (older browsers)
return NextResponse.redirect(redirectUrl, 301)
```

### Adding Query String Preservation

Redirects automatically preserve query strings, but you can customize:
```typescript
if (redirectPath) {
  const redirectUrl = url.clone()
  redirectUrl.pathname = redirectPath
  // redirectUrl.search is automatically preserved
  return NextResponse.redirect(redirectUrl, 308)
}
```

## Performance Considerations

- **Middleware runs at the Edge**: Fast globally, minimal latency
- **No database queries**: Configuration is in code (or use Edge Config)
- **Cached at CDN**: After first request, subsequent requests are cached
- **Efficient pattern matching**: Uses exact string matching, very fast

## Recommendation for Customer

Based on the question, here's the recommendation:

1. **For simple, code-managed redirects**: Use this middleware approach
   - Best for tech-savvy teams
   - Version controlled with your code
   - Fast, no database overhead

2. **For CMS-managed redirects**: Extend this POC to fetch from database
   - Best for non-technical content teams
   - More flexible, no deployments needed
   - Slightly more complex setup

3. **Don't use Vercel's built-in redirects** for this use case
   - They apply to ALL domains equally
   - Cannot be made domain-specific
   - Better suited for simple, global redirects

## Resources

- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Vercel Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware)
- [Multi-Tenant Architecture on Vercel](https://vercel.com/guides/nextjs-multi-tenant-application)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## License

MIT

## Questions?

This POC was built to answer a specific multi-tenant redirect question. For more details or questions, reach out to the Vercel Dev Success team.
