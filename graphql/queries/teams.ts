import { gql } from "@apollo/client";

export const allTeamsInfoQuery = gql`
  query allTeamsInfo {
    teamCollection(limit: 3) {
      items {
        name
        alias

        sys {
          id
        }
        linkedFrom {
          chapterCollection(limit: 50) {
            items {
              id
              linkedFrom {
                onboardStepCollection(limit: 10) {
                  items {
                    step
                    sys {
                      id
                    }
                  }
                }
              }
            }
          }
        }
        # add the fields you want to query
      }
    }
  }
`;

//TODO: id should be dynamic
export const teamsQuery = gql`
  query Teams($id: String!) {
    team(id: $id) {
      name
      linkedFrom {
        chapterCollection {
          total
          items {
            name
            id
            linkedFrom {
              onboardStepCollection {
                total
                items {
                  sys {
                    id
                  }
                  step
                  title
                  body
                  codeBlock
                }
              }
            }
          }
        }
      }
      # add the fields you want to query
    }
  }
`;
