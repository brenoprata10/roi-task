export const FilterTypes = {

    INCLUDES: {
        key: 'INCLUDES',
        operation: handleOperationInclude
    },
    GREATER_THAN: {
        key: 'GREATER_THAN',
        operation: handleOperationGreaterThan
    },
    DATE_GREATER_THAN: {
        key: 'DATE_GREATER_THAN',
        operation: handleOperationDateGreaterThan
    },
    EQUAL_LENGTH: {
        key: 'EQUAL_LENGTH',
        operation: handleOperationEqualLength
    },
    EQUALS: {
        key: 'EQUALS',
        operation: handleOperationEquals
    }
};

function handleOperationInclude(firstObject, secondObject) {

    return firstObject.toUpperCase().includes(secondObject.toUpperCase());
}

function handleOperationGreaterThan(firstObject, secondObject) {

    return firstObject >= secondObject;
}

function handleOperationEqualLength(firstObject, length) {

    return firstObject.length === Number(length);
}

function handleOperationEquals(firstObject, secondObject) {

    return firstObject == secondObject;
}

function handleOperationDateGreaterThan(firstObject, secondObject) {

    if (!Date.prototype.isPrototypeOf(firstObject)) {

        firstObject = new Date(firstObject);
    }

    if (!Date.prototype.isPrototypeOf(secondObject)) {

        secondObject = new Date(secondObject);
    }

    return firstObject >= secondObject;
}