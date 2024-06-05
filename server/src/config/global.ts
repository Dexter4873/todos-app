export default () => ({
  port: parseInt(process.env['PORT']),
  databaseUrl: process.env['DB_URL'],
});
