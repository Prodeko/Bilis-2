export const renderEmoji = (emoji: string) => {
    return String.fromCodePoint(parseInt(emoji.slice(2)));
}