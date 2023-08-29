// Node factory
const Node = (d) => {
  let left = null;
  let right = null;

  return {
    data: d,
    get left() {
      return left;
    },
    set left(value) {
      left = value;
    },
    get right() {
      return right;
    },
    set right(value) {
      right = value;
    },
  };
};

export default Node;
