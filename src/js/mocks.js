const helloWorld = `
function helloWorld() {
  console.log('hello world');
};

helloWorld();
`;

export const mockScripts = [
  {
    id: 1,
    title: 'Hello World',
    description: `A Little Hello World Script`,
    body: helloWorld.toString(),
  },
];
