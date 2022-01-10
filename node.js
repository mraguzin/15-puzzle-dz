
/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */
///Object.defineProperty(exports, "__esModule", { value: true });
export class Node {
    constructor(key, value) {
        this.parent = null;
        this.child = null;
        this.degree = 0;
        this.isMarked = false;
        this.key = key;
        this.value = value;
        this.prev = this;
        this.next = this;
    }
}
// const _Node = Node;
// export { _Node as Node };
