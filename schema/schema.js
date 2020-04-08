const graphql = require('graphql');
const axios = require('axios');
const User = require('../models/user');
const Company = require('../models/company')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
           return User.find().then( res => {
          return res.filter(v=>v.companyId==parentValue.id)
          
         });


        // return axios
        //   .get(`http://localhost:3000/companies/${parentValue.id}/users`)
        //   .then(res => res.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    companyId:{ type : GraphQLString },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return Company.findById(parentValue.companyId, res => {
          return { res };
        });


        // return axios
        //   .get(`http://localhost:3000/companies/${parentValue.companyId}/`)
        //   .then(res => res.data);
      }
    }
  })
});




const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {

        return User.findById(args.id, (res) => {
          return { res }
        })

      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return User.find().then(res => {
          return res.map(v => {
            return v
          })
        })

      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parentValue, args) {
        return Company.find().then(res => {
          return res.map(v => {
            return v
          })
        })

      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return Company.findById(args.id, (res) => {
          return { res }
        })

      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, age, companyId }) {
        const user = new User({
          firstName,
          age,
          companyId

        })
        return user.save()
          .then(result => {
            return { ...result._doc, id: result._id };
          })
          .catch(err => {
            throw err;
          });
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return User.findByIdAndRemove(id).then(res => {
          return { res }
        }).catch(err => {
          throw err
        })

      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return User.findByIdAndUpdate(args.id, args, (result) => {
          {
            return { ...result };
          }
        })
      }
    },

    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, description }) {
        const company = new Company({
          name,
          description
        })
        return company.save().then(result => {
          console.log(result)
          return { ...result._doc, id: result._id }
        }).catch(err => {
          throw err;
        })
      }
    }

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});


/*
 resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}/`)
          .then(res => res.data);
      }
*/ 