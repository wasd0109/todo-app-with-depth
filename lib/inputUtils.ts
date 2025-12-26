export const detectEndOfTyping = (doneTypingInterval = 1000, callback: () => void) => {
    const typingTimer = setTimeout(() => callback(), doneTypingInterval)
    return () => clearTimeout(typingTimer)
}
