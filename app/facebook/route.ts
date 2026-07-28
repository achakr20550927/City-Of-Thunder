import { redirect } from 'next/navigation';
import { club } from '@/content/club';

/**
 * The header's Facebook tab links straight to facebook.com, but this route
 * exists so any internal `/facebook` reference resolves to the club's page
 * rather than a 404.
 */
export function GET() {
  redirect(club.social.facebook);
}
