const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'Album-f6kgrv6o2vdklagtebobyob3s4-dev';
const appendString = "-8662c254-f081-70a5-2b87-0d7dab2307e8";
const excludeString = "267242a4-b0c1-7064-09d2-b272cb7c9d3d";
const deleteAlbumIds = async () => {
    let scanParams = { TableName: tableName };
    let count = 0;

    do {
        const items = await dynamoDB.scan(scanParams).promise();

        for (const item of items.Items || []) {
            if (item.id && !item.id.endsWith(appendString) && !item.id.endsWith(excludeString)) {
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

    console.log(`Album IDs deleted successfully! Total items removed: ${count}`);
};

deleteAlbumIds().catch(console.error);
