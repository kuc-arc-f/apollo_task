const {gql} = require('apollo-server-express');
import {GQL_QUERY} from './query'
import {GQL_MUTATION} from './mutation'

const scheme = {
  getTypeDefs : function(){
    return gql`
    type User {
      id: String
      email: String
      name: String
      firebaseUid: String
    }
    type Project {
      id: Int
      name: String
      createdAt: String
      userId:   Int
      inveiteCode: String
    }
    type ProjectMember {
      id: Int
      projectId: Int
      userId:   Int
      name: String
      createdAt: String
    }
    type Task {
      id: Int
      projectId: Int
      title: String
      content: String
      complete: String
      status: String
      createdAt: String
      userId:   Int
    }
    type TaskProject {
      tasks: [Task]
      project: Project
    }    
    ${GQL_QUERY}
    ${GQL_MUTATION}
  `;
  }
}
export default scheme;
/*
type TaskProject {
}
*/
