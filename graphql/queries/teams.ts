import { gql } from "@apollo/client";

export const allTeamsInfoQuery = gql`
  query allTeamsInfo {
    teamCollection {
      items {
        name
        alias
      }
    }
  }
`;

//TODO: id should be dynamic
export const teamsQuery = gql`
  query Teams {
    team(id: "zlwVLa1bEFrULYbe1KUQ4") {
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
