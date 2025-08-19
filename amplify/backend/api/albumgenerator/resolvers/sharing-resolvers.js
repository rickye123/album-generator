// Custom GraphQL resolvers for sharing functionality
// Add these to your Amplify custom resolvers

// Resolver for shareList mutation
export const shareListResolver = {
    typeName: 'Mutation',
    fieldName: 'shareList',
    requestMappingTemplate: `
    {
      "version": "2017-02-28",
      "operation": "UpdateItem",
      "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.listId)
      },
      "update": {
        "expression": "ADD sharedWith :userId",
        "expressionValues": {
          ":userId": $util.dynamodb.toDynamoDBJson($util.list.copyAndAdd([], $ctx.args.userId))
        }
      }
    }
  `,
    responseMappingTemplate: `$util.toJson($ctx.result)`
};

// Resolver for unshareList mutation
export const unshareListResolver = {
    typeName: 'Mutation',
    fieldName: 'unshareList',
    requestMappingTemplate: `
    {
      "version": "2017-02-28",
      "operation": "UpdateItem",
      "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.listId)
      },
      "update": {
        "expression": "DELETE sharedWith :userId",
        "expressionValues": {
          ":userId": $util.dynamodb.toDynamoDBJson($util.list.copyAndAdd([], $ctx.args.userId))
        }
      }
    }
  `,
    responseMappingTemplate: `$util.toJson($ctx.result)`
};

// Resolver for toggleListVisibility mutation
export const toggleListVisibilityResolver = {
    typeName: 'Mutation',
    fieldName: 'toggleListVisibility',
    requestMappingTemplate: `
    {
      "version": "2017-02-28",
      "operation": "UpdateItem",
      "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.listId)
      },
      "update": {
        "expression": "SET isPublic = :isPublic",
        "expressionValues": {
          ":isPublic": $util.dynamodb.toDynamoDBJson($ctx.args.isPublic)
        }
      }
    }
  `,
    responseMappingTemplate: `$util.toJson($ctx.result)`
};