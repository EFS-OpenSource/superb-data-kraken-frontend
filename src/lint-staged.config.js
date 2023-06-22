module.exports = {
  './**/*.{ts,tsx}': (files) =>
    `nx affected --target=typecheck --files=${files.join(',')}`,
};
