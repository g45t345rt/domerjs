# Dev

It's a small and simple package so there is honestly not much TODO.

The built files are in `/release` folder and only checked-in during releases.
To get domerjs from the latest source, you will have to build it from Github repo.

```bash
git clone https://github.com/g45t345rt/domerjs.git/domerjs
cd domerjs
npm install

npm run build # build source file inside docs/release
npm run web # start this website with domerjs
npm run apps-[appname] # start specific example
npm run docs # build website for Github pages
```

JS files are transpile with [parcel-bundler](https://parceljs.org/)