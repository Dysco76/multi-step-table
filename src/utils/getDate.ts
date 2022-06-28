export function getDate(data: string | Date) {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const result = `${day}.${month}.${date.getFullYear()}`

    return result;
}