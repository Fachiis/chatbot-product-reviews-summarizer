// Implementation details. In-memory storage for conversations or use a database in production
const conversations = new Map<string, string>();

// A repository is a layer in the repository pattern that abstracts the data access logic.
// Repositories are responsible for managing data retrieval, storage, and mapping
// between the application's domain models and the underlying data source (e.g., database, API).
// This separation allows for easier testing, maintenance, and flexibility in changing data sources.

// Export public API/Interface
export const ConversationRepository = {
   getLastResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },

   setLastResponseId(conversationId: string, responseId: string) {
      conversations.set(conversationId, responseId);
   },
};
