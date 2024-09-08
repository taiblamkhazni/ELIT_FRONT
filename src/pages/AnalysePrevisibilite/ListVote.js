import { Fragment } from "react";
import PropTypes from "prop-types";

import Vote from "./Vote";

/**
 * @brief This component renders a list of votes for a project.
 */
const ListVote = ({
  votes,
  contributors,
  user,
  emailCurrentUser,
}) => {
  const projectVotes = contributors
    ?.filter(
      (contributor) =>
        contributor.role === "CDP" || contributor.role === "Contributeur"
    )
    .reduce(
      (list, contributor) => {
        const id = contributor.contributerId;
        let userVote = votes?.find((vote) => vote.userId === id);
        if (!userVote) {
          userVote = {
            chosenPMM: null,
            isConfirmed: false,
            justification: null,
            predictibilityAnalysisId: null,
            predictibilityValue: 0,
            userId: id,
            voteId: null,
          };
        }
         if (userVote) {
          const contributorFunction = (contributor.func)?.charAt(0) + (contributor.func)?.slice(1).toLowerCase();
          const voteComponent = (
            <div key={id}>
              <Vote
                votes={votes}
                username={`${
                  contributor.firstName
                } ${contributor.lastName.toUpperCase()}`}
                role={
                  contributor.role === "CDP"
                    ? "Chef de projet"
                    : contributorFunction
                }
                state={
                  userVote.isConfirmed
                    ? "Validé"
                    : "Dans l'attente de validation"
                }
                owner={emailCurrentUser === contributor.email}
                validate={userVote.isConfirmed}
                email
                value={userVote}
                userId={id}
              />
            </div>
          );
          if (id === user.id) {
            list[0].push(voteComponent);
          } else {
            list[1].push(voteComponent);
          }
        }
        return list;
      },
      [[], []]
    );
  return projectVotes.map((voteComponents) => {
    return <Fragment key={voteComponents.id}>{voteComponents}</Fragment>;
  });
};

/**
 * @brief The properties of the ListVote component.
 */
ListVote.propTypes = {
  votes: PropTypes.array.isRequired,
  contributors: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  emailCurrentUser: PropTypes.string.isRequired,
};

export default ListVote;
