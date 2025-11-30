import app from './app';

const port = Number(process.env.PORT) || 3000;

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on http://localhost:${port}`);
});
