export const getPostedTime = (dateString: string): string => {
  const postedDate = new Date(dateString);
  const currentDate = new Date();

  const diffInMs = currentDate.getTime() - postedDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) {
    return 'Posted Today';
  }

  if (diffInDays === 1) {
    return 'Posted Yesterday';
  }

  return `Posted ${diffInDays} ${diffInDays === 1 ? 'Day' : 'Days'} Ago`;
};
