function getTimeAgo(timestamp: number): string {
  /**
   * Function to obtain text feedback, how much time has elapsed since the provided timestamp.
   * @param {number} timestamp - Parsed data into a timestamp using Date.parse(ISOSTRING).
   * @returns {string} The sum of the two numbers.
   */
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  if (seconds < 60) {
    return "few seconds ago";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes === 1) {
    return "1 minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours === 1) {
    return "1 hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "1 day ago";
  } else if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks === 1) {
    return "1 week ago";
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  }

  const months = Math.floor(days / 30.44);

  if (months === 1) {
    return "1 month ago";
  } else if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(days / 365.25);

  if (years === 1) {
    return "1 year ago";
  } else {
    return `${years} years ago`;
  }
}

export default getTimeAgo;
