import Tree from "./tree.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const newTree = Tree(array);

prettyPrint(newTree.root);

newTree.insert(276);

prettyPrint(newTree.root);

newTree.delete(4);

prettyPrint(newTree.root);

console.log(newTree.find(67));

console.log(newTree.find(4));

// 1. Print each node's data using the provided function
console.log("Level Order Traversal using provided function:");
newTree.levelOrder((node) => console.log(node.data));

// 2. Collect node data in an array
const levelOrderArray = newTree.levelOrder();
console.log("\nLevel Order Traversal returning an array:");
console.log(levelOrderArray);
