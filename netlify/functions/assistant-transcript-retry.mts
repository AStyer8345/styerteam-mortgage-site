import type { Config } from '@netlify/functions';
import { retryTranscripts } from './_shared/transcript-store.ts';

export default async function handler() {
  await retryTranscripts();
}
export const config: Config = { schedule: '*/5 * * * *' };
