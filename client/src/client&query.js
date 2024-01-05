import cookies from "../cookie";

const {
  gql,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} = require("@apollo/client");

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${cookies.get("auth-token")}`,
  },
});

const removeHeadersForLogout = () => {
  client.setLink(
    createHttpLink({
      uri: "http://localhost:4000/",
      headers: {},
    })
  );
};

const SIGN_USER = gql`
  mutation signupUser($data: SignupUserInput!) {
    signupUser(data: $data) {
      token
      user {
        name
        email
        imgUrl
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($data: LoginUserInput!) {
    loginUser(data: $data) {
      token
      user {
        email
        password
      }
    }
  }
`;

const CURRENT_USER = gql`
  query {
    me {
      id
      name
      email
      password
      imgUrl
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost($data: CreatePostInput!) {
    createPost(data: $data) {
      title
      content
      imgUrl
      status
      createdAt
      author {
        name
      }
    }
  }
`;

const SINGLE_POST = gql`
  query ($id: ID!) {
    post(id: $id) {
      id
      title
      content
      createdAt
      status
      imgUrl
      author {
        name
      }
      comments {
        id
        text
        author {
          name
          imgUrl
        }
      }
    }
  }
`;

const ALL_POSTS = gql`
  query {
    posts {
      id
      title
      content
      imgUrl
      createdAt
      status
      author {
        name
        imgUrl
      }
    }
  }
`;

const MY_POSTS = gql`
  query {
    myPosts {
      id
      title
      content
      imgUrl
      status
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      text
      author {
        name
      }
      postId {
        title
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      name
      email
      password
      imgUrl
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      title
      content
      imgUrl
      status
    }
  }
`
const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`

const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $data: UpdateCommentInput!) {
    updateComment(id: $id, data: $data) {
      text
    }
  }
`
const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
      text
    }
  }
`

export {
  client,
  SIGN_USER,
  LOGIN_USER,
  CURRENT_USER,
  removeHeadersForLogout,
  CREATE_POST,
  SINGLE_POST,
  ALL_POSTS,
  MY_POSTS,
  CREATE_COMMENT,
  UPDATE_USER,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_COMMENT,
  DELETE_COMMENT
};
