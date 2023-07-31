const isFollowing = (username: string, following: any[]) => {
  const follower = following.filter((user) => user.username === username);
  if (follower.length > 0) return true;
  return false;
};
export default isFollowing;
