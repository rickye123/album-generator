import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-west-2" });
const dynamoDB = DynamoDBDocumentClient.from(client);
const tableName = "Album-f6kgrv6o2vdklagtebobyob3s4-dev";
const appendString = "-8662c254-f081-70a5-2b87-0d7dab2307e8";
const targetLength = "6D3RQD5AQZ4P2aDzsZmBI4".length;

const updateAlbumIds = async () => {
  let scanParams = { TableName: tableName };
  let count = 0;

  do {
    const items = await dynamoDB.send(new ScanCommand(scanParams));
    
    for (const item of items.Items || []) {
      count++;
      console.log(`Processing item ${count}: ${JSON.stringify(item)}`);
      
      if (item.albumId && item.albumId.length === targetLength) {
        const newAlbumId = item.albumId + appendString;

        const updateParams = new UpdateCommand({
          TableName: tableName,
          Key: { id: item.id },
          UpdateExpression: "SET albumId = :newAlbumId",
          ExpressionAttributeValues: { ":newAlbumId": newAlbumId },
        });

        await dynamoDB.send(updateParams);
        console.log(`Updated albumId for item ${item.id}: ${newAlbumId}`);
      }
    }
    scanParams.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (scanParams.ExclusiveStartKey);

  console.log(`Album IDs updated successfully! Total items processed: ${count}`);
};

updateAlbumIds().catch(console.error);
