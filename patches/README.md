# Patches for React Three Fiber

This directory contains patches to fix the peer dependency issues with @react-three/fiber requiring React 19 while we're using React 18.

## Instructions

- The @react-three-fiber-react-peer-dep.patch file modifies the peer dependency requirement in the @react-three/fiber package
- This allows us to use React 18 with the latest version of React Three Fiber
- Do not delete these patches as they're required for the build to succeed

## How to apply patches manually

If needed, you can apply patches manually with:

```bash
npx patch-package @react-three/fiber
```
