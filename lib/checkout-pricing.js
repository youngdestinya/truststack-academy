import { courseBySlug, courseCatalog } from './course-catalog';

export const SINGLE_TRACK_KOBO = 2500000;
export const BUNDLE_DISCOUNT_PERCENT = 25;
export const BUNDLE_FULL_KOBO = SINGLE_TRACK_KOBO * courseCatalog.length;
export const BUNDLE_KOBO = BUNDLE_FULL_KOBO * (100 - BUNDLE_DISCOUNT_PERCENT) / 100;

export function checkoutProduct(value) {
  if (typeof value !== 'string') return null;
  const key = value.trim().toLowerCase();
  if (key === 'bundle' || key === 'bundle: all 8 tracks' || key === 'all 8 tracks bundle') {
    return { slug: 'bundle', title: 'Bundle: All 8 Tracks', amount: BUNDLE_KOBO };
  }
  const course = courseBySlug[key] || courseCatalog.find((item) => item.title.toLowerCase() === key);
  return course ? { slug: course.slug, title: course.title, amount: SINGLE_TRACK_KOBO } : null;
}
