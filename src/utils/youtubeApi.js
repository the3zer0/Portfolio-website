const STATE_KEY = '__maowaYouTubeApiState__'

function getState() {
  if (typeof window === 'undefined') return null
  if (!window[STATE_KEY]) {
    window[STATE_KEY] = {
      installed: false,
      fired: false,
      callbacks: new Set(),
    }
  }
  return window[STATE_KEY]
}

function installDispatcher() {
  const state = getState()
  if (!state || state.installed) return state

  state.installed = true
  const previous = window.onYouTubeIframeAPIReady

  window.onYouTubeIframeAPIReady = () => {
    state.fired = true
    const callbacks = Array.from(state.callbacks)
    state.callbacks.clear()
    callbacks.forEach((callback) => {
      try {
        callback()
      } catch (err) {
        // ignore callback errors so one consumer does not block the others
      }
    })

    if (typeof previous === 'function') {
      try {
        previous()
      } catch (err) {
        // ignore errors from any pre-existing handler
      }
    }
  }

  return state
}

export function registerYouTubeIframeAPIReady(callback) {
  if (typeof window === 'undefined') return () => {}

  const state = installDispatcher()

  if (window.YT && window.YT.Player) {
    queueMicrotask(() => {
      try {
        callback()
      } catch (err) {
        // ignore callback errors
      }
    })

    return () => {}
  }

  state.callbacks.add(callback)

  return () => {
    state.callbacks.delete(callback)
  }
}
