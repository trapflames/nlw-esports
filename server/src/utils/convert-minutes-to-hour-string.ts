/**
 * 
 * @param minutesAmount Receives number of minutes to return hours and minutes String
 *  1080 -> 18:00
 */

export function convertMinutesToHoursString (minutesAmount: number) {
    const hours = Math.floor(minutesAmount / 60)
    const minutes = minutesAmount % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}