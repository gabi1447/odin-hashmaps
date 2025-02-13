import { linkedList } from "./linkedList.js";

function HashMap() {
    const LoadFactor = 0.8;
    let capacity = 16;
    let buckets = new Array(capacity);
    let numOfBuckets = 0;
    let numOfKeys = 0;

    function incrementNumOfBucketsByOne() {
        numOfBuckets++;
    }

    function incrementNumOfKeysByOne() {
        numOfKeys++;
    }

    function getNumOfBuckets() {
        return numOfBuckets;
    }

    function length() {
        return numOfKeys;
    }

    function getHashTable() {
        return buckets;
    }

    function updateCapacity(length) {
        capacity = length;
    }

    function has(key) {
        const bucketIndexOfKey = hash(key);
        const bucket = buckets[bucketIndexOfKey];

        if (bucket === undefined) {
            return false;
        }

        let currentNode = bucket.getHead();
        while (currentNode !== null) {
            if (key in currentNode.value) {
                return true;
            }
            currentNode = currentNode.next;
        }

        return false;
    }

    function get(key) {
        const bucketIndexOfKey = hash(key);
        const bucket = buckets[bucketIndexOfKey];

        if (bucket === undefined) {
            return null;
        }

        let currentNode = bucket.getHead();
        while (currentNode !== null) {
            if (key in currentNode.value) {
                return currentNode.value[key];
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    function set(key, value) {
        const keyValuePair = { [key]: value };
        const bucketIndex = hash(key);
        console.log(bucketIndex);

        if (buckets[bucketIndex] === undefined) {
            buckets[bucketIndex] = linkedList();
            buckets[bucketIndex].append(keyValuePair);
            incrementNumOfBucketsByOne();
            incrementNumOfKeysByOne();
            increaseHashTable();
            return;
        } else if (modifyValueIfKeyPresent(key, value, buckets[bucketIndex])) {
            return;
        }
        if (buckets[bucketIndex].getSize() === 0) {
            numOfBuckets++;
        }
        buckets[bucketIndex].append(keyValuePair);
        incrementNumOfKeysByOne();
        increaseHashTable();
    }

    function modifyValueIfKeyPresent(key, value, bucket) {
        let currentNode = bucket.getHead();

        while (currentNode !== null) {
            if (currentNode.value[key]) {
                currentNode.value[key] = value;
                return true;
            }
            currentNode = currentNode.next;
        }

        return false;
    }

    function increaseHashTable() {
        if (!shouldWeIncreaseSizeOfHashTable()) {
            return;
        }

        updateCapacity(capacity * 2);
        const newHashTable = new Array(capacity);

        for (let bucket of buckets) {
            if (!bucket) {
                continue;
            }
            const headOfBucket = bucket.getHead();
            const headBucketKey = Object.keys(headOfBucket.value)[0];
            const newIndex = hash(headBucketKey);
            newHashTable[newIndex] = bucket;
        }
        buckets = newHashTable;
    }

    function shouldWeIncreaseSizeOfHashTable() {
        const maxValue = Math.round(LoadFactor * capacity);

        return numOfBuckets >= maxValue ? true : false;
    }

    function remove(key) {
        if (!has(key)) {
            return false;
        }

        const bucketIndex = hash(key);
        const bucket = buckets[bucketIndex];
        let currentNode = bucket.getHead();
        let currentIndex = 0;

        while (currentNode !== null) {
            if (key in currentNode.value) {
                bucket.removeAt(currentIndex);
                numOfKeys--;
                if (bucket.getSize() === 0) {
                    numOfBuckets--;
                }
                return true;
            }
            currentIndex++;
        }
    }

    function clear() {
        capacity = 16;
        numOfBuckets = 0;
        numOfKeys = 0;
        const restoredArray = new Array(capacity);
        buckets = restoredArray;
    }

    function keys() {
        let arrayOfKeys = [];
        for (let bucket of buckets) {
            if (!bucket) {
                continue;
            }
            const head = bucket.getHead();
            let currentNode = head;
            while (currentNode !== null) {
                const key = Object.keys(currentNode.value)[0];
                arrayOfKeys.push(key);
                currentNode = currentNode.next;
            }
        }

        return arrayOfKeys;
    }

    function values() {
        let arrayOfValues = [];
        for (let bucket of buckets) {
            if (!bucket) {
                continue;
            }
            const head = bucket.getHead();
            let currentNode = head;
            while (currentNode !== null) {
                const object = currentNode.value;
                const key = Object.keys(object)[0];
                const value = object[key];
                arrayOfValues.push(value);
                currentNode = currentNode.next;
            }
        }

        return arrayOfValues;
    }

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % capacity;
        }

        return hashCode;
    }

    return {
        getHashTable,
        length,
        getNumOfBuckets,
        has,
        get,
        set,
        remove,
        clear,
        keys,
        values,
    };
}
