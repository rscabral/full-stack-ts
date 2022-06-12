const queryTwitterResolvers = {
  currentUser: () => ({
    id: "123",
    name: "Rafael",
    handle: "Say10",
    coverUrl: "",
    avatarUrl: "",
    createdAt: "",
    updatedAt: "",
  }),
  suggestions: () => [],
};

export default queryTwitterResolvers;