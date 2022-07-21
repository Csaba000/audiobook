const newLocal = 'current';
module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        targets: {
          _node: newLocal,
          get node() {
            return this._node;
          },
          set node(value) {
            this._node = value;
          },
        },
      },
    ],
  ],
};
