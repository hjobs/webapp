import React from 'react';

import { getSalaryDescription, getTStrings } from '../../services/var';

/** @param {boolean} showBonus @param {object} job */
export const Bonus = ({job, showBonus}) => {
  if (!job.has_bonus) return null;
  else {
    const t = getTStrings();
    return (
      <span style={{
        borderBottom: "1px dotted #101010",
        marginLeft: "1em"
      }}>
        {
          showBonus && !!job.bonus_value ?
          (t.job.bonus + ": " + job.bonus_value) :
          t.job.salaryMore
        }
      </span>
    );
  }
}

/** @param {boolean} showBonus @param {object} job */
const Salary = ({job, showBonus}) => {
  return (
    <span>
      <i className="fa fa-usd" aria-hidden="true"></i>{" "}
      {getSalaryDescription(job)}
      <Bonus job={job} showBonus={showBonus} />
    </span>
  );
}

export default Salary;
