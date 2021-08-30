export function isNotEmpty(data: any) {
    if (data === null) {
        return false
    }

    else if (data === undefined) {
        return false
    }

    else if (typeof data === "object") {
        return Object.keys(data).length > 0;
    }
    else {
        return data.length > 0;
    }
}

