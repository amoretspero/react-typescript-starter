# React-Typescript-Starter

Boilerplate code for typescript-driven react development.  
  
All exmples are from [Official Documentation](https://reactjs.org), with [TypeScript](https://www.typescriptlang.org/) and [React-Hooks](https://reactjs.org/docs/hooks-intro.html) twist.  
  
## Major packages  
  
- `react`: Self-descriptive.
- `react-dom`: Self-descriptive.
- `eslint`: For typescript code linting.
- `eslint-plugin-react`: For `jsx`, `tsx` code linting.
- `@typescript-eslint/parser`: For typescript code linting.
- `@typescript-eslint/eslint-plugin`: For typescript code linting.
- `fork-ts-checker-webpack-plugin`: For typescript-based type checking.
- `ts-loader`: For bundling typescript codes.
- `typescript`: Self-descriptive.
- `webpack`: For bundling typescript codes into embedable single javascript file.
- `webpack-cli`: For bundling, with cli usage.
- `webpack-dev-server`: For development. This package offers hot-reloading and other features. This package is built on top of `webpack-dev-middleware` and `webpack-hot-middleware`. If someone does not want to use `webpack-dev-server`, one can use those two packages accordingly.  
  
## Run examples  
  
0. Clone this repository and run `npm install`. (Node >= 10.x are recommended.)
1. Uncomment code regions that you want to execute in `index.tsx`. Example sources are distinguished by `#region`.
2. `npm run dev` and see browser output.