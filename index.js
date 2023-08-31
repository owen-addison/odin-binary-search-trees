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

// ... [Your existing code in index.js]

// Testing preOrder traversal
console.log("PreOrder Traversal:");
const preOrderResult = newTree.preOrder();
console.log(preOrderResult); // Expected: [root, left, ..., right, ...]

// Testing inOrder traversal
console.log("\nInOrder Traversal:");
const inOrderResult = newTree.inOrder();
console.log(inOrderResult); // Expected: [left-most leaf, ..., root, ..., right-most leaf]

// Testing postOrder traversal
console.log("\nPostOrder Traversal:");
const postOrderResult = newTree.postOrder();
console.log(postOrderResult); // Expected: [left-most leaf, ..., right-most leaf, ..., root]

// Testing preOrder traversal with a function
console.log("\nPreOrder Traversal with function:");
newTree.preOrder((node) => console.log(node.data)); // Expected: [root, left, ..., right, ...]

// Testing inOrder traversal with a function
console.log("\nInOrder Traversal with function:");
newTree.inOrder((node) => console.log(node.data)); // Expected: [left-most leaf, ..., root, ..., right-most leaf]

// Testing postOrder traversal with a function
console.log("\nPostOrder Traversal with function:");
newTree.postOrder((node) => console.log(node.data)); // Expected: [left-most leaf, ..., right-most leaf, ..., root]

// Testing the height function using node input
const nodeHeight = newTree.height(newTree.root.right);
console.log("Height of the node:", nodeHeight); // Expected: height of the given node (2)

// Testing the height function using value
const valueHeight = newTree.height(9);
console.log("Height of the node with value", 9, "is:", valueHeight); // Expected: height of the node with the given value (1)

// Testing the height function to return full tree height
const treeHeight = newTree.height(newTree.root);
console.log("Height of the tree:", treeHeight); // Expected: height of the tree (3)

// Testing the depth function using node input
const nodeDepth = newTree.depth(newTree.root.right);
console.log("Depth of the node:", nodeDepth); // Expected: depth of the given node (1)

// Testing the depth function using value
const valueDepth = newTree.depth(9);
console.log("Depth of the node with value", 9, "is:", valueDepth); // Expected: depth of the node with the given value (2)

newTree.insert(6500);
newTree.insert(6800);
newTree.insert(6900);
newTree.insert(7000);
newTree.insert(7100);
newTree.insert(7300);
newTree.insert(7400);

// Test the isBalanced function
const balanced = newTree.isBalanced();
console.log("Is the tree balanced?", balanced); // Expected: false
