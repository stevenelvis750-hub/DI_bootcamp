const express = require('express');
const tasksRouter = require('./routes/tasks');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.json());
app.use('/tasks', tasksRouter);
 
// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
 
// Central error handler (bad JSON body, file read/write failures, etc.)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});
 
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
 
module.exports = app;
 