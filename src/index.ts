const PORT = process.env.PORT || 5000;
import { app } from './app';
app.listen({ port: 5000 }, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
