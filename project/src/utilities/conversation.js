export const generateConversationId = (mentorId, menteeId) => {
  return [mentorId, menteeId].sort().join("_");
};
