export const setServerSideError = (setError, errorMessage) => {
    setError('common', {
        type: 'server side',
        message: errorMessage
    })
}

export const setClientSideError = (setError, errorMessage) => {
    setError('common', {
        type: 'clientSide',
        message: errorMessage
    })
}