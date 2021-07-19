export const CURRENT = 'CURRENT';
export const COMPLETED = 'COMPLETED';
export const PLAN_TO_WATCH = 'PLAN_TO_WATCH';
export const ON_HOLD = 'ON_HOLD';
export const DROPPED = 'DROPPED';

export function getEqualValue(value) {
  const spacingRegExp = /( |-)/g;
  const sanitizedValue = value.trim().toUpperCase().replace(spacingRegExp, '_');

  if ([CURRENT, COMPLETED, PLAN_TO_WATCH, ON_HOLD, DROPPED].includes(sanitizedValue)) {
    return sanitizedValue;
  } else if (sanitizedValue === 'WATCH_LATER') {
    return PLAN_TO_WATCH;
  }
  return value;
}
