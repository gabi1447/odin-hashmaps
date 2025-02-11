import { linkedList } from "./linkedList";

function HashMap() {
    const LoadFactor = 0.8;
    let capacity = 16;
    let buckets = [];

    function updateCapacity(length) {
        capacity = length;
        buckets.length = length;
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
        buckets,
    };
}
