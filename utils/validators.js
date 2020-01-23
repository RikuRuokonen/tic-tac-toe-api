const validRequest = (req) => {
  const { body } = req;
  if (body.move && body.move.row && body.move.column) {
    const { move } = body;
    const { row, column } = move;
    if (row > 2 || row < 0 || column > 2 || column < 0) {
      return false;
    }
    return true;
  }
  return false;
};

module.exports = { validRequest };
