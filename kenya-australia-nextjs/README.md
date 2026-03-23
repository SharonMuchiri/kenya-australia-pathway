# Kenya → Australia Education Pathway App

A comprehensive roadmap application for Kenyan KCSE graduates planning to study in Australia.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## Features

### MVP Features (8 Core Modules)

| Feature | Description |
|---------|-------------|
| **KCSE Assessment** | Grade input with automatic B+ threshold detection → routes to Direct Entry or Foundation pathway |
| **Genuine Student Module** | Four guided prompts capturing return incentives, economic circumstances, study rationale, and career goals |
| **Financial Calculator** | Dynamic calculation using `(Tuition × 1) + A$29,710 + A$2,500` with gap analysis |
| **Language Tracker** | IELTS/PTE/TOEFL score input with 6.0/6.5 threshold validation |
| **University Browser** | Filterable list of 12 universities with search, regional filter, and tuition slider |
| **Regional PSW Badges** | Visual indicators for Adelaide, Perth, Gold Coast, Geelong, Hobart, Townsville (+1-2 years work rights) |
| **Visa Checklist** | Interactive Subclass 500 document tracker with mandatory item flagging |
| **Summary Dashboard** | Readiness score (0-5) with per-section status indicators |

### Key Business Rules

- **Grade ≥ B+** → Direct Bachelor Entry
- **Grade < B+** → Foundation/Diploma Pathway (1 year)
- **Living Cost (DHA 2026)**: A$29,710/year
- **Travel Allowance**: A$2,500
- **Language Threshold**: IELTS 6.0 (6.5 for Nursing/Health)
- **Regional PSW Bonus**: +1-2 years on Subclass 485 visa

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone or download the project
cd kenya-australia-pathway

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build
4. Click **Deploy**

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

Or connect your Git repository at [netlify.com](https://app.netlify.com)

### Deploy to Railway

1. Connect your GitHub repository at [railway.app](https://railway.app)
2. Railway auto-detects Next.js
3. Set the start command: `npm start`
4. Deploy

### Deploy to Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

```bash
# Build and run Docker container
docker build -t kenya-australia-app .
docker run -p 3000:3000 kenya-australia-app
```

## Project Structure

```
kenya-australia-pathway/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles + Tailwind
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main application component
│   ├── lib/
│   │   └── constants.ts     # Universities, visa checklist, grades
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── public/                   # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Customization

### Adding Universities

Edit `src/lib/constants.ts`:

```typescript
export const UNIVERSITIES: University[] = [
  {
    id: 13,
    name: 'Your University',
    city: 'City',
    state: 'STATE',
    isRegional: true,  // true = PSW bonus
    pswBonus: 2,       // 0, 1, or 2 years
    avgTuition: 35000,
    cricos: 'XXXXXX',
    ranking: 200,
    courses: ['Course 1', 'Course 2'],
  },
  // ...
];
```

### Updating Living Costs

For future DHA requirement changes, edit `src/lib/constants.ts`:

```typescript
export const LIVING_COST_AUD = 29710; // Update this value
```

### Modifying Visa Checklist

Add or remove items in `src/lib/constants.ts`:

```typescript
export const VISA_CHECKLIST: VisaChecklistItem[] = [
  {
    id: 13,
    item: 'New Document',
    description: 'Description of the document',
    mandatory: true, // or false
  },
  // ...
];
```

## Environment Variables (Optional)

Create a `.env.local` file for any API integrations:

```env
# Example for future features
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Deployment**: Vercel / Netlify / Docker

## License

MIT License - feel free to use this for educational purposes.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For questions about Australian student visas, refer to:
- [Department of Home Affairs](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500)
- [Study Australia](https://www.studyaustralia.gov.au/)

---

Built with ❤️ for Kenyan students pursuing their Australian dreams.
