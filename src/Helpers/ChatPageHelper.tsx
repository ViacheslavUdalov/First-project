export const idWithIndex = (index: number | string) => {
    const date = new Date()
    let result = String(date.getTime())
    result = result + '_' + index
    return result
}