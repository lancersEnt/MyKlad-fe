const updateFollowingListOnFollow = (user: any, following: any[]) => {
  const newList = [...following, user];
  return newList;
};

const updateFollowingListOnUnfollow = (username: string, following: any[]) => {
  return following.filter((user) => user.username !== username);
};

export { updateFollowingListOnFollow, updateFollowingListOnUnfollow };
