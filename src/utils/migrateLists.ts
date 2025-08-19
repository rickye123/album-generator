import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import { listLists } from '../graphql/queries';
import { updateList } from '../graphql/mutations';
import { Amplify } from '@aws-amplify/core';
import { Observable } from 'rxjs';
import { GraphQLResult } from '@aws-amplify/api-graphql';

/**
 * Migration script to add default values for isPublic and sharedWith
 * to existing lists in DynamoDB
 */
export const migrateExistingLists = async () => {
    try {
        console.log('Starting migration of existing lists...');

        let nextToken: string | null = null;
        let migratedCount = 0;

        do {
            // Fetch all lists
            const response = await GraphQLAPI.graphql(
                Amplify as any,
                graphqlOperation(listLists, {
                    limit: 100,
                    nextToken
                }),
                {}
            );

            if (response instanceof Observable) {
                throw new Error('Expected a non-subscription query/mutation but received a subscription.');
            }

            const typedResponse = response as GraphQLResult<any>;
            const lists = typedResponse.data?.listLists?.items || [];
            nextToken = typedResponse.data?.listLists?.nextToken || null;

            // Update each list that doesn't have the new fields
            for (const list of lists) {
                const needsUpdate = list.isPublic === undefined || list.isPublic === null ||
                    list.sharedWith === undefined || list.sharedWith === null;

                if (needsUpdate) {
                    try {
                        await GraphQLAPI.graphql(
                            Amplify as any,
                            graphqlOperation(updateList, {
                                input: {
                                    id: list.id,
                                    isPublic: list.isPublic ?? false,
                                    sharedWith: list.sharedWith ?? []
                                }
                            }),
                            {}
                        );

                        migratedCount++;
                        console.log(`Migrated list: ${list.name} (${list.id})`);
                    } catch (error) {
                        console.error(`Failed to migrate list ${list.id}:`, error);
                    }
                }
            }
        } while (nextToken);

        console.log(`Migration completed. Updated ${migratedCount} lists.`);
        return { success: true, migratedCount };
    } catch (error) {
        console.error('Migration failed:', error);
        return { success: false, error };
    }
};

/**
 * Function to check if migration is needed
 */
export const checkMigrationNeeded = async () => {
    try {
        const response = await GraphQLAPI.graphql(
            Amplify as any,
            graphqlOperation(listLists, { limit: 10 }),
            {}
        );

        if (response instanceof Observable) {
            throw new Error('Expected a non-subscription query/mutation but received a subscription.');
        }

        const typedResponse = response as GraphQLResult<any>;
        const lists = typedResponse.data?.listLists?.items || [];

        const needsMigration = lists.some((list: any) =>
            list.isPublic === undefined || list.isPublic === null ||
            list.sharedWith === undefined || list.sharedWith === null
        );

        return needsMigration;
    } catch (error) {
        console.error('Error checking migration status:', error);
        return false;
    }
};