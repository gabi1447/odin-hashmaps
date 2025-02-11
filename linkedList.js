export function linkedList() {
    let head = null;
    let tail = null;
    let current = null;
    let size = 0;

    function getHead() {
        return head;
    }

    function getTail() {
        return tail;
    }

    function incrementSizeByOne() {
        size++;
    }

    function getSize() {
        return size;
    }

    function prepend(value) {
        const newNode = node(value);
        incrementSizeByOne();
        if (head === null) {
            head = newNode;
            tail = newNode;
            return;
        } else if (getSize() === 1) {
            tail = head;
        }
        newNode.next = head;
        head = newNode;
        return;
    }

    function append(value) {
        const newNode = node(value);
        incrementSizeByOne();
        if (head === null) {
            head = newNode;
            tail = newNode;
            return;
        }
        current = head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
        tail = newNode;
        return;
    }

    function pop() {
        const listLength = getSize();
        if (listLength === 0) {
            return "The list is empty, you can't pop any elements";
        } else if (listLength === 1) {
            head = null;
            size--;
            return;
        }
        const secondToLastNode = at(listLength - 2);
        secondToLastNode.next = null;
        size--;
    }

    function at(index) {
        if (index > getSize() - 1) {
            return new Error("The index provided is out of range");
        }
        let pointer = 0;
        let currentNode = head;

        while (pointer != index) {
            currentNode = currentNode.next;
            pointer++;
        }

        return currentNode;
    }

    function contains(value) {
        let currentNode = head;

        while (true) {
            if (currentNode === null) {
                break;
            } else if (currentNode.value === value) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }

    function containsRecursive(value, head) {
        if (head === null) {
            return false;
        } else if (head.value === value) {
            return true;
        }

        return containsRecursive(value, head.next);
    }

    function find(value) {
        let currentIndex = 0;
        let currentNode = head;
        while (true) {
            if (currentNode === null) {
                return currentNode;
            } else if (currentNode.value === value) {
                return currentIndex;
            }
            currentNode = currentNode.next;
            currentIndex++;
        }
    }

    function insertAt(value, index) {
        const newNode = node(value);

        const previousNode = at(index - 1);
        const previousNextReference = previousNode.next;
        previousNode.next = newNode;

        newNode.next = previousNextReference;
        incrementSizeByOne();
    }

    function removeAt(index) {
        if (index === 0) {
            head = head.next;
            size--;
            return;
        }

        const previousNode = at(index - 1);
        const nodeToBeDeleted = at(index);
        const nextReferenceOfDeletedNode = nodeToBeDeleted.next;
        previousNode.next = nextReferenceOfDeletedNode;

        size--;
    }

    function toString() {
        let pointer = head;
        let sequence = "";
        if (pointer === null) {
            console.log(pointer);
            return;
        }
        while (pointer !== null) {
            sequence += `${pointer.value} -> `;
            pointer = pointer.next;
        }
        sequence += "null";
        console.log(sequence);
    }
    return {
        getHead,
        getTail,
        at,
        contains,
        containsRecursive,
        prepend,
        append,
        pop,
        find,
        insertAt,
        removeAt,
        getSize,
        toString,
    };
}

function node(value) {
    let next = null;
    return {
        value,
        next,
    };
}
