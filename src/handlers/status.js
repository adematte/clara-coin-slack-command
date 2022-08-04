const coinRepositoryMjs = require('../lib/coinRepository')

const VALID_COMMAND_NAMES = [
  'status',
  'stato'
]

const canHandle = (sender, _text) => {
  if (!_text) {
    return false
  }
  const text = _text.toLowerCase()

  const parts = text.split(' ')

  const [
    command
  ] = parts

  if (!VALID_COMMAND_NAMES.includes(command)) {
    return false
  }

  return true
}

const sentMessage = sent => {
  const totalSent = Object.values(sent).reduce((acc, val) => acc + val, 0)
  const formattedSent = Object.entries(sent).map(([name, value]) => ` - *${name}*: ${value}`).join('\n')

  if (totalSent === 0) {
    return 'Non hai inviato nessun Clara Coin.'
  }

  return `Hai inviato un totale di ${totalSent} Clara Coin così ripartiti: \n${formattedSent}`
}

const receivedMessage = received => {
  const totalReceived = Object.values(received).reduce((acc, val) => acc + val, 0)
  const formattedReceived = Object.entries(received).map(([name, value]) => ` - *${name}*: ${value}`).join('\n')

  if (totalReceived === 0) {
    return 'Non hai ricevuto nessun Clara Coin.'
  }

  return `Hai ricevuto un totale di ${totalReceived} Clara Coin così ripartiti: \n${formattedReceived}`
}

const handle = async (sender, text) => {
  const sent = await coinRepositoryMjs.sent(sender)
  const received = await coinRepositoryMjs.received(sender)
  const remainingCoins = await coinRepositoryMjs.remainingCoins(sender)

  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Ciao ${sender}, hai ancora ${remainingCoins} Clara Coin. Ecco un recap della tua situazione*`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: sentMessage(sent)
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: receivedMessage(received)
        }
      }
    ]
  }
}

module.exports = {
  canHandle,
  handle
}
