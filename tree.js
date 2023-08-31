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

  // Level order tree traversal function using an iterative approach
  const levelOrderIt = (func = null) => {
    // Initialise the empty array to store node values (if no function is provided)
    let result = [];

    // Initialise the queue and push the root node
    let queue = [];
    queue.push(root);

    // While the queue is not empty
    while (queue.length > 0) {
      // Dequeue a node from the queue
      let currentNode = queue.shift();

      // Carry out the appropriate logic depending on whether a function is to used
      // or the data is to be added to the array
      if (func !== null) {
        // If a function is provided apply function to the node
        func(currentNode);
      } else {
        // Else, add the node's data to the results array
        result.push(currentNode.data);
      }

      // If the node has a left child, enqueue the left child
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      // If the node has a right child, enqueue the right child
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    // If function was not provided, return the results array
    if (func === null) {
      return result;
    }
  };

  // Pre order tree traversal function using an iterative approach
  const preOrderIt = (func = null) => {
    // If root is null return an empty array
    if (root === null) {
      return [];
    }

    // Initialise an empty stack and push the root onto the stack
    let stack = [];
    stack.push(root);

    // Initialise the empty array to store node values (if no function is provided)
    let result = [];

    while (stack.length > 0) {
      // Pop a node from the stack
      let currentNode = stack.pop();

      // Carry out the appropriate logic depending on whether a function is to used
      // or the data is to be added to the array
      if (func !== null) {
        // If a function is provided apply function to the node
        func(currentNode);
      } else {
        // Else, add the node's data to the results array
        result.push(currentNode.data);
      }

      // If the node has a right child, push it onto the stack
      if (currentNode.right !== null) {
        stack.push(currentNode.right);
      }

      // If the node has a left child, push it onto the stack
      if (currentNode.left !== null) {
        stack.push(currentNode.left);
      }
    }

    // If function was not provided, return the results array
    if (func === null) {
      return result;
    }
  };

  // In order tree traversal function using an iterative approach
  const inOrderIt = (func = null) => {
    let result = [];
    let stack = [];
    let currentNode = root;

    while (currentNode !== null || stack.length > 0) {
      // Reach the left most Node of the current Node
      while (currentNode !== null) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }

      // Current must be NULL at this point
      currentNode = stack.pop();

      if (func !== null) {
        func(currentNode);
      } else {
        result.push(currentNode.data);
      }

      // Now visit the right subtree
      currentNode = currentNode.right;
    }

    if (func === null) {
      return result;
    }
  };

  // Post order tree traversal function using an iterative approach
  const postOrderIt = (func = null) => {
    let result = [];
    let stack1 = [];
    let stack2 = [];
    stack1.push(root);

    while (stack1.length > 0) {
      let currentNode = stack1.pop();
      stack2.push(currentNode);

      if (currentNode.left !== null) {
        stack1.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        stack1.push(currentNode.right);
      }
    }

    while (stack2.length > 0) {
      let currentNode = stack2.pop();

      if (func !== null) {
        func(currentNode);
      } else {
        result.push(currentNode.data);
      }
    }

    if (func === null) {
      return result;
    }
  };

  // Recursive function to calculate the height of a node
  const heightRec = (input) => {
    let node;

    // Check if the input is a node object or a value
    if (typeof input === "object" && input !== null) {
      node = input;
    } else {
      node = findRec(root, input); // Assuming findRec is the recursive find function you've defined
    }

    // Base case: If the node is null, return -1
    if (node === null) {
      return -1;
    }

    // Recursively calculate the height of the left and right subtrees
    const leftHeight = heightRec(node.left);
    const rightHeight = heightRec(node.right);

    // Return the maximum of the two heights, plus 1 for the current edge
    return Math.max(leftHeight, rightHeight) + 1;
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

    levelOrder: (func) => {
      return levelOrderIt(func);
    },

    preOrder: (func) => {
      return preOrderIt(func);
    },

    inOrder: (func) => {
      return inOrderIt(func);
    },

    postOrder: (func) => {
      return postOrderIt(func);
    },

    height: (input) => {
      return heightRec(input);
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
