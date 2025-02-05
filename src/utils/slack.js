const SLACK_USER_REGEX = /<@\w+\|([.a-zA-Z0-9_-]+)>/gm
const SLACK_CHANNEL_REGEX = /<#\w+\|([.a-zA-Z0-9_-]+)>/gm

const isSlackUser = receiver => {
  const regEx = new RegExp(SLACK_USER_REGEX)
  return Boolean(regEx.exec(receiver))
}

const isSlackChannel = maybeChannel => {
  const regEx = new RegExp(SLACK_CHANNEL_REGEX)
  return Boolean(regEx.exec(maybeChannel))
}

const getSlackUserName = receiver => {
  if (!isSlackUser(receiver)) {
    return ''
  }
  const regEx = new RegExp(SLACK_USER_REGEX)
  const match = regEx.exec(receiver)
  return match[1]
}

const getSlackChannel = maybeChannel => {
  if (!isSlackChannel(maybeChannel)) {
    return ''
  }
  const regEx = new RegExp(SLACK_CHANNEL_REGEX)
  const match = regEx.exec(maybeChannel)
  return match[1]
}

module.exports = {
  isSlackChannel,
  isSlackUser,
  getSlackUserName,
  getSlackChannel
}
