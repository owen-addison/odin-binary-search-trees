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

  return {
    root,

    insert: (data) => {
      root = insertRec(root, data);
    },

    delete: (data) => {
      root = deleteRec(root, data);
    },

    find: (value) => {
      findRec(root, value);
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
find(value):
  - Call recursive find function findRec(root, value)

findRec(node, value)
  - Base case: if node.data === null then return null (value not found)
  - If node.data === value then return node (value found)
  - If node.data > value then call findRec(node.left, value) to search left subtree
  - If node.data < value then call findRec(node.right, value) to search right subtree
*/
