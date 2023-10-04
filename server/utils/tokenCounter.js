function countTokens(messages) {
  return messages.reduce((count, msg) => {
    return count + msg.content.split(/\s+/).length;
  }, 0);
}

export default {
  countTokens,
};