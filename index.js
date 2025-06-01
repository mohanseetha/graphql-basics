import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { movies, reviews, authors } from "./db.js";

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_, args) => movies.find((movie) => movie.id === args.id),
    reviews: () => reviews,
    review: (_, args) => reviews.find((review) => review.id === args.id),
    authors: () => authors,
    author: (_, args) => authors.find((author) => author.id === args.id),
  },
  Movie: {
    reviews: (parent) => reviews.filter((r) => r.movie_id === parent.id),
  },
  Author: {
    reviews: (parent) => reviews.filter((r) => r.author_id === parent.id),
  },
  Review: {
    movie: (parent) => movies.find((m) => m.id === parent.movie_id),
    author: (parent) => authors.find((a) => a.id === parent.author_id),
  },
  Mutation: {
    deleteMovie: (_, args) => {
      const index = movies.findIndex((m) => m.id === args.id);
      if (index === -1) return null;
      const [deletedMovie] = movies.splice(index, 1);
      return deletedMovie;
    },
    deleteReview: (_, args) => {
      const index = reviews.findIndex((r) => r.id === args.id);
      if (index === -1) return null;
      const [deletedReview] = reviews.splice(index, 1);
      return deletedReview;
    },
    deleteAuthor: (_, args) => {
      const index = authors.findIndex((a) => a.id === args.id);
      if (index === -1) return null;
      const [deletedAuthor] = authors.splice(index, 1);
      return deletedAuthor;
    },
    addMovie: (_, { input }) => {
      const newMovie = {
        id: String(Math.random().toFixed(10)).slice(2),
        ...input,
      };
      movies.push(newMovie);
      return newMovie;
    },
    addReview: (_, { input }) => {
      const newReview = {
        id: String(Math.random().toFixed(10)).slice(2),
        ...input,
      };
      reviews.push(newReview);
      return newReview;
    },
    addAuthor: (_, { input }) => {
      const newAuthor = {
        id: String(Math.random().toFixed(10)).slice(2),
        ...input,
      };
      authors.push(newAuthor);
      return newAuthor;
    },
    updateMovie: (_, { id, input }) => {
      const movie = movies.find((m) => m.id === id);
      if (!movie) return null;
      Object.assign(movie, input);
      return movie;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at: " + url);
