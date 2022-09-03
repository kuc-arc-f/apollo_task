
import LibProject from './lib/LibProject';
import LibUser from './lib/LibUser';
import LibProjectMember from './lib/LibProjectMember';
import LibTaskItem from './lib/LibTaskItem';

/* resolvers */
const resolvers = {
  Query: {
    hello: () => 'Hello world-22',
    /* user */
    async user(parent, args, context, info){
      return await LibUser.getItem(args);
    },
    /* project */
    async projects(parent, args, context, info){
      return await LibProject.getItems(args);
    }, 
    async project(parent, args, context, info){
      return await LibProject.getItem(args.id);
    }, 
    /* projectMember */
    async projectMembers(parent, args, context, info){
      return await LibProjectMember.getItems(args);
    }, 
    async countProjectMembers(parent, args, context, info){
      return await LibProjectMember.countProjectMembers(args);
    }, 
    /*  task */
    async tasks(parent, args, context, info){
      return await LibTaskItem.getItems(args);
    }, 
    async task(parent, args, context, info){
      return await LibTaskItem.getItem(args.id);
    },
    async tasksProject(parent, args, context, info){
      return await LibTaskItem.tasksProject(args);
    }, 
  },
  Mutation: {
    /* user */
    async addUser(parent, args, context, info){
      return await LibUser.addUser(args);
    }, 
    /* Project */
    async addProject(parent, args, context, info){
      return await LibProject.addProject(args);
    }, 
    updateProject: async (parent, args, context) => {
      const ret = await LibProject.updateProject(args)
      return ret
    },
    deleteProject: async (parent, args, context) => {
      const ret = await LibProject.deleteProject(args)
      return ret
    },   
    /* ProjectMember */
    async addProjectMember(parent, args, context, info){
      return await LibProjectMember.addProjectMember(args);
    }, 
    deleteProjectMember: async (parent, args, context) => {
      const ret = await LibProjectMember.deleteProjectMember(args)
      return ret
    },   
    /* Task */
    async addTask(parent, args, context, info){
      return await LibTaskItem.addTaskItem(args);
    }, 
    updateTask: async (parent, args, context) => {
      const ret = await LibTaskItem.updateTaskItem(args)
      return ret
    },
    deleteTask: async (parent, args, context) => {
      const ret = await LibTaskItem.deleteTaskItem(args)
      return ret
    },   
 
  }
};
export default resolvers;
