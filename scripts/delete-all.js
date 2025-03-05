const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'AlbumList-f6kgrv6o2vdklagtebobyob3s4-dev';
const deleteAlbumIds = async () => {
    let scanParams = { TableName: tableName };
    let count = 0;
  
    do {
      const items = await dynamoDB.scan(scanParams).promise();
      
      for (const item of items.Items || []) {
        if (item.id) {
          count++;
          console.log(`Deleting item ${count}: ${JSON.stringify(item)}`);
          
          const deleteParams = {
            TableName: tableName,
            Key: { id: item.id },
          };
  
          await dynamoDB.delete(deleteParams).promise();
          console.log(`Deleted item with id ${item.id}`);
        }
      }
      scanParams.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (scanParams.ExclusiveStartKey);
  
    console.log(`List IDs deleted successfully! Total items removed: ${count}`);
  };
  
  deleteAlbumIds().catch(console.error);
