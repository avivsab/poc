export const findSortingHandler = val => {
    // Number, String or Date - order here is meters
    if (typeof val === 'number') {
        return 'sortByNum';
    }
    if (typeof val !== 'string') {
        return false;
    }
    // only strings from here on
    // check if the string is Date string
    let formattedDateValue;
    const acceptedChars = ['-', '.', '/'];
    for (const char of acceptedChars) {
        if (val.match(new RegExp(char))) {
            const stringPartsArray = val.split(char);
            if (stringPartsArray.length !== 3) {
                continue; // supporting only 3 parts Date
            }
            if (stringPartsArray.some(item => isNaN(+item))) {
                continue; // verify all items are numeric
            }
            if (stringPartsArray[0].length < 4) {
                formattedDateValue = stringPartsArray.reverse().join('-');
            } else {
                formattedDateValue = stringPartsArray.join('-');
            }

            // Verify is Date
            if (!isNaN(Date.parse(formattedDateValue))) {
                const dateWrapper = new Date(formattedDateValue);
                if (typeof dateWrapper.getMonth === 'function') {
                    return 'sortByDate';
                }
            }
        }
    }
    return 'sortByString'
}
