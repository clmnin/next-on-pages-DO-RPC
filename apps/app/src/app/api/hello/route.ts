import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const counterId = getRequestContext().env.COUNTERS.idFromName('A');
  const stub = getRequestContext().env.COUNTERS.get(counterId);

  const counterValue = await stub.getCounterValue()

  return new Response(counterValue)
}
