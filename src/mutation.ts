
export const GQL_MUTATION = `
type Mutation {
  addToken(token: String): String
  addUser(name: String!, email: String!, firebaseUid: String  ): User
  addProject(name: String!, firebaseUid: String  ): Project
  updateProject(id: Int!, name: String!): Project
  deleteProject(id: Int!): Project
  addProjectMember(firebaseUid:String,  projectId: Int  ): ProjectMember
  deleteProjectMember(id: Int!): ProjectMember
  addTask(projectId: Int, title: String!, content: String!, status: String, 
    complete: String!, userId: String, firebaseUid:String): Task
  updateTask(id: Int!, title: String!, content: String!, complete: String! 
     ,status: String): Task
  deleteTask(id: Int!): Task
}
`;
/*
updateTask(id: Int!, title: String!, content: String!, complete: String!): Task
*/