export const typeDefs = `#graphql
    type Movie {
        id: ID!,
        title: String!,
        year: Int!,
        director: String!,
        genres: [String!]!,
        reviews: [Review!]
    }
    type Review {
        id: ID!,
        rating: Int!,
        content: String!,
        movie: Movie!,
        author: Author!
    }
    type Author {
        id: ID!,
        name: String!,
        verified: Boolean!,
        reviews: [Review!]
    }
    type Query {
        movies: [Movie],
        movie(id: ID!): Movie,
        reviews: [Review],
        review(id: ID!): Review,
        authors: [Author],
        author(id: ID!): Author
    }
    type Mutation {
        deleteMovie(id: ID!): Movie,
        deleteReview(id: ID!): Review,
        deleteAuthor(id: ID!): Author
        addMovie(input: MovieInput!): Movie,
        addReview(input: ReviewInput!): Review,
        addAuthor(input: AuthorInput!): Author,
        updateMovie(id: ID!, input: UpdateMovieInput!): Movie,
    }
    input MovieInput {
        title: String!,
        year: Int!,
        director: String!,
        genres: [String!]!
    }
    input ReviewInput {
        rating: Int!,
        content: String!,
        author_id: ID!,
        movie_id: ID!
    }
    input AuthorInput {
        name: String!,
        verified: Boolean!
    }
    input UpdateMovieInput {
        title: String,
        year: Int,
        director: String,
        genres: [String!]
    }
`;
