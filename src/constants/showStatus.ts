enum Status {
  CURRENT = 'Current',
  COMPLETED = 'Completed',
  PLAN_TO_WATCH = 'Plan to Watch',
  ON_HOLD = 'On Hold',
  DROPPED = 'Dropped',
  NO_VALUE = '',
}
export default Status;

export function getEqualStatusValue(value: string): Status {
  const replaceWithSpaceRegExp = /(_|-|\+)/g;
  const sanitizedValue = value
    .trim()
    .toLowerCase()
    .replace(replaceWithSpaceRegExp, ' ');

  switch (sanitizedValue) {
    case 'current':
      return Status.CURRENT;
    case 'completed':
      return Status.COMPLETED;
    case 'plan to watch':
    case 'watch later':
      return Status.PLAN_TO_WATCH;
    case 'on hold':
      return Status.ON_HOLD;
    case 'dropped':
      return Status.DROPPED;
    default:
      return Status.NO_VALUE;
  }
}
