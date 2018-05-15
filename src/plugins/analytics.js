export default {
  logEvent (category, action, label, sessionId = null) {
    dataLayer.push({ // eslint-disable-line no-undef
      'appEventCategory': category,
      'appEventAction': action,
      'appEventLabel': label,
      'sessionId': sessionId
    })
    dataLayer.push({ 'event': 'appEvent' }) // eslint-disable-line no-undef
  },

  logPage (path, name, sessionId = null) {
    dataLayer.push({ // eslint-disable-line no-undef
      'screenPath': path,
      'screenName': name,
      'sessionId': sessionId
    })
    dataLayer.push({ 'event': 'appScreenView' }) // eslint-disable-line no-undef
  }
}
