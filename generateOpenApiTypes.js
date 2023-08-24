const fs = require('fs');
const openapiTS = require('openapi-typescript');

// Logging function with emojis
function log(message, emoji) {
  console.log(`${emoji} ${message}`);
}

(async () => {
  log('Script started.', '✨');

  const output = await openapiTS('https://appserver.zenml.io/openapi.json', {
    exportType: true,
    transform: (schema) => {
      customTransformer(schema);
    },
  });

  log('Writing output to file...', '📝');
  fs.writeFileSync('schema.d.ts', output);

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
