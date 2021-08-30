export function isEmpty(data: any) {
    if (data === undefined) {
        return true
    }
    else if (typeof data === "object") {
        return Object.keys(data).length === 0;
    }
    else {
        return data.length === 0;
    }
}

