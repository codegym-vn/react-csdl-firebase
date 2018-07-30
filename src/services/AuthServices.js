const _store = {
    isAuthenticated: false,
    user: {},
    token: {
        accessToken: '',
        refreshToken: ''
    },
    subscribers: []
}

export const logout = () => {
    _store.isAuthenticated = false;
    _store.user = {}

    _broadcast()
}

export const authSuccess = ({user, token}) => {
    _store.user = {
        ...user
    }
    _store.token = {
        ...token
    }
    _store.isAuthenticated = true
    _broadcast()
}

const _broadcast = () => {
    _store.subscribers.forEach(subscriber => {
        typeof subscriber === 'function' && subscriber(_store.user)
    })
}

export const isAuthenticated = () => _store.isAuthenticated

export const getCurrentUser = () => _store.user

export const subscribeAuthentication = subscriber => {
    if (typeof subscriber !== 'function') return
    if (_store.subscribers.indexOf(subscriber) !== -1) return

    _store.subscribers = [].concat(_store.subscribers, [subscriber])
}

export const unsubscribeAuthentication = subscriber => {
    _store.subscribers = _store.subscribers.filter(_sub => _sub !== subscriber)
}