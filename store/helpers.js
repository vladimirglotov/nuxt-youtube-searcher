export function sliceString (string) {
  let newString = string.slice(0, 90)
  if (newString.length < string.length) {
    newString += '...'
  }
  return newString
}

export function dateFormat (date) {
  const newDate = new Date(date)
  return `${newDate.getDate()} ${(newDate.getMonth() < 9 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1))} ${newDate.getFullYear()}`
}
