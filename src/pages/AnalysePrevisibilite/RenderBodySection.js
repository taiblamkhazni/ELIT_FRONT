import Results from "pages/AnalysePrevisibilite/Results";
import PropTypes from "prop-types";
import { Spinner } from "utils/Spinner";

import ListVote from "./ListVote";

/**
 * @brief This component renders the body section of the analysis page.
 */
const RenderBodySection = ({
  current,
  percentages,
  methodologies,
  elementalEscores,
  iteration2,
  votes,
  contributors,
  user,
  emailCurrentUser,
  projectData,
}) => {
  if (current === undefined || projectData === undefined) return null;

  if (current === 0) {
    return (
      <div>
        {!votes?.length > 0 ? (
          <Spinner key={"spinner"} size={"small"} message="" />
        ) : (
          <ListVote
            votes={votes}
            contributors={contributors}
            user={user}
            emailCurrentUser={emailCurrentUser}
            iteration2={iteration2}
          />
        )}
      </div>
    );
  } else if (
    current === 1 &&
    percentages >= 50 &&
    methodologies &&
    methodologies.length > 0
  ) {
    return (
      <Results
        result={"high"}
        methodologies={methodologies}
      />
    );
  } else if (
    current === 1 &&
    percentages < 50 &&
    methodologies &&
    methodologies?.length > 0 &&
    elementalEscores &&
    elementalEscores?.length > 0
  ) {
    return (
      <Results
        result={"low"}
        methodologies={methodologies}
        elementalEscores={elementalEscores}
      />
    );
  }

  return null;
};

/**
 * @brief PropTypes for the RenderBodySection component.
 */
RenderBodySection.propTypes = {
  current: PropTypes.number.isRequired,
  percentages: PropTypes.number.isRequired,
  methodologies: PropTypes.array.isRequired,
  elementalEscores: PropTypes.array,
  iteration2: PropTypes.bool,
  votes: PropTypes.array.isRequired,
  contributors: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  emailCurrentUser: PropTypes.string.isRequired,
  projectData: PropTypes.object.isRequired,
};
export default RenderBodySection;
