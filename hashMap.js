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

    function getHashTable() {
        return buckets;
    }

    function updateCapacity(length) {
        capacity = length;
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
        set,
    };
}
