export default () => ({
  port: parseInt(process.env['PORT']),
  databaseUrl: process.env['DB_URL'],
  jwtSecretAccess: process.env['JWT_SECRET_ACCESS'],
  jwtSecretRefresh: process.env['JWT_SECRET_REFRESH'],
});
