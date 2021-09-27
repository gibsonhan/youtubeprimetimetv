import { isEmpty } from "./isEmpty"

//TODO: consider REGEX for tag capture
export function formatTagsForServer(data: string) {
    let tags = data.split('#')
    let filterTags = tags.filter((ele) => ele !== '')
    return filterTags
    //reinsert tags so we can use extract tags after update. 
}

export function formatTagsForClient(data: []): string {
    if (!Array.isArray(data)) return ''
    let tagsToString = ''
    data.forEach((tag: string) => {
        tagsToString += '#' + tag + ' '
    })
    return tagsToString.trimEnd()
}
