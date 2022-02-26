export const setServerSideError = (setError: any, errorMessage: string) => {
    setError('common', {
        type: 'server side',
        message: errorMessage
    })
}

export const setClientSideError = (setError: any, errorMessage: string) => {
    setError('common', {
        type: 'clientSide',
        message: errorMessage
    })
}