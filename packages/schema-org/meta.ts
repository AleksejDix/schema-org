export const RootSchemas = [
  'Article',
  'Breadcrumb',
  'Comment',
  'HowTo',
  'Image',
  'LocalBusiness',
  'Organization',
  'Person',
  'Product',
  'Question',
  'Recipe',
  'Review',
  'Video',
  'WebPage',
  'WebSite',
]

export const schemaOrgAutoImports = {
  '@vueuse/schema-org': [
    'useSchemaOrg',
    // definitions
    ...RootSchemas
      .map(schema => [`define${schema}`, `define${schema}Partial`])
      .flat(),
    'asSearchAction',
    'asReadAction',
  ],
}

export const schemaOrgComponents = [
  'SchemaOrgInspector',
  ...RootSchemas.map(s => `SchemaOrg${s}`),
]
