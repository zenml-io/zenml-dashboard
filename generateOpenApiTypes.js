const fs = require('fs');
const openapiTS = require('openapi-typescript');

// Logging function with emojis
function log(message, emoji) {
  console.log(`${emoji} ${message}`);
}

(async () => {
  log('Script started.', '✨');

  const appserverOutput = await openapiTS(
    'https://baris.develaws.zenml.io/openapi.json',
    {
      exportType: true,
      transform: (schema) => {
        customTransformer(schema);
      },
    },
  );

  const hubapiOutput = await openapiTS('https://hubapi.zenml.io/openapi.json', {
    exportType: true,
    transform: (schema) => {
      customTransformer(schema);
    },
  });
  log('Writing output to file...', '📝');
  fs.writeFileSync('appserverSchema.d.ts', appserverOutput);
  fs.writeFileSync('hubapiSchema.d.ts', hubapiOutput);

  log('Script completed successfully.', '✅');
})();

/**
 *
 * @param {import("openapi-typescript").SchemaObject} schema
 * @returns {import("openapi-typescript").SchemaObject}
 */
function customTransformer(schema) {
  if (schema.type === 'object' && !schema.properties) {
    schema.additionalProperties = true;
  }
  return schema;
}
