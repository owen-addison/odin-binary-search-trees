import Node from "./node.js";

// Tree factory
const Tree = (array) => {
  // Sort the array and remove duplicates using a sorting function and the Set() object
  const uniqSorted = [...new Set(array.sort((a, b) => a - b))];

  let root = buildTree(uniqSorted, 0, uniqSorted.length - 1);

  // Recursive function for inserting nodes into BST
  const insertRec = (root, data) => {
    // If the tree is empty, return a new node
    if (root === null) {
      root = Node(data);
      return root;
    }

    // Otherwise, recur down the tree
    if (data < root.data) {
      root.left = insertRec(root.left, data);
    } else if (data > root.data) {
      root.right = insertRec(root.right, data);
    }

    // Return the (unchanged) node pointer
    return root;
  };

  // Recursive function for deleting nodes in BST
  const deleteRec = (root, data) => {
    // Base case
    if (root === null) {
      return root;
    }

    // Recursive calls for ancestors of node to be deleted
    if (root.data > data) {
      root.left = deleteRec(root.left, data);
      return root;
    } else if (root.data < data) {
      root.right = deleteRec(root.right, data);
      return root;
    }

    // If one of the children is empty
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    // If both children exist
    else {
      let succParent = root;

      // Find successor
      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      // Delete successor
      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      // Copy successor data to root
      root.data = succ.data;

      // Return the root
      return root;
    }
  };

  // Recursive find function
  const findRec = (node, value) => {
    // Base case
    if (!node) {
      return null;
    }

    // If value found
    if (node.data === value) {
      return node;
    }

    // Recursively search the BST to find value
    if (node.data > value) {
      return findRec(node.left, value);
    } else if (node.data < value) {
      return findRec(node.right, value);
    }
  };

  return {
    root,

    insert: (data) => {
      root = insertRec(root, data);
    },

    delete: (data) => {
      root = deleteRec(root, data);
    },

    find: (value) => {
      return findRec(root, value);
    },
  };
};

// Function for building tree
function buildTree(array, start, end) {
  // Check the base case
  if (start > end) {
    return null;
  }

  // Initialise start, end and mid points of array
  const mid = parseInt((start + end) / 2);
  // Make the middle element the root node
  const root = Node(array[mid]);

  // Recursively construct the left subtree and make it left child of root
  root.left = buildTree(array, start, mid - 1);

  // Recursively construct the right subtree and make it left child of root
  root.right = buildTree(array, mid + 1, end);

  // Return the root
  return root;
}

export default Tree;

/*
PSEUDOCODE
levelOrder(func = null):
  - Initialise an empty queue and push the root node onto it
  - Initialise an empty array to store node values (if no function is provided)
  - While the queue is not empty:
    - Dequeue a node from the front of the queue
    - If a function is provided, apply the function to the node
    - Otherwise, add the node's value to the array
    - If the node has a left child, enqueue the left child
    - If the node has a right child, enqueue the right child
  - If no function was provided, return the array of node values
*/
