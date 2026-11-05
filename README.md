# Production build

From the repository root, use the same Node.js major version as the Vercel
project and the same npm version as its build log. Then run:

```sh
npm ci
npm run build
```

Both environments install from the committed `package-lock.json`. Create
React App reads `.env.production` during the build, so compiler and ESLint
warnings that would fail on Vercel also fail locally. An existing `CI`
environment variable takes precedence, so leave it unset or set it to `true`.
The production output is in `build/`.
