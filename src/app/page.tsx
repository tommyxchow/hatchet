import { type RouteParams } from '@/lib/types';
import Stories from './[slug]/page';

export default function HomePage(routeParams: RouteParams) {
  return <Stories {...routeParams} />;
}
