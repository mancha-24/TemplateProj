export const getDayAndHourBySelection = (timeSelected: string) => {
  let hours, days
  switch (timeSelected) {
    case '1':
      hours = 40
      days = 5
      break
    case '2':
      hours = 44
      days = 5.5
      break
    case '3':
      hours = 45
      days = 5
      break
    case '4':
      hours = 45
      days = 5.5
      break
    case '5':
      hours = 45
      days = 6
      break
    default:
      break
  }

  return { days, hours }
}
