import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, '../src/openapi.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/docs', express.static(path.join(__dirname, '../docs')));

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

app.get('/api/openapi.json', (req, res) => {
  res.json(swaggerDocument);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Sample ReDoc API',
    documentation: {
      redoc: 'http://localhost:3000/docs',
      swagger: 'http://localhost:3000/api-docs',
      openapi: 'http://localhost:3000/api/openapi.json'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 ReDoc Documentation: http://localhost:${PORT}/docs`);
  console.log(`📋 Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`📄 OpenAPI Spec: http://localhost:${PORT}/api/openapi.json`);
});

export default app;
