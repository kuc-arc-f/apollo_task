
export const GQL_QUERY = `
  type Query {
    hello: String
    getToken : String
    projects(firebaseUid: String): [Project]
    project(id: Int): Project
    user(firebaseUid: String): User
    projectMembers(projectId: Int): [ProjectMember]
    countProjectMembers(projectId: Int, firebaseUid: String): Int
    tasks(projectId: Int): [Task]
    task(id: Int): Task

  }
`;

/*
countProjectMembers(projectId: Int, firebaseUid: String): Int
projects(projectId: Int): [Project]
projects(firebaseUid: String): [Project]
tasks(firebaseUid: String): [Task]
*/