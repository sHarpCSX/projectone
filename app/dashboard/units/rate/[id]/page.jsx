// pages/dashboard/units/[id]/rate.js

import React from "react";
import styles from "../../../../ui/dashboard/units/singleUnit/singleUnit.module.css";
import Image from "next/image";
import { fetchSingleUnit } from "../../../../lib/data";
import UnitRatingForm from "../../../../ui/dashboard/units/singleUnit/rateUnit/UnitRatingForm";
import { auth } from "../../../../auth";

const SingleUnitPage = async ({ params }) => {
  const { id } = params;
  const unit = await fetchSingleUnit(id);
  const userSession = await auth();
  const ratingUserId = userSession.userId;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{unit.name}</div>
      <div className={styles.formContainer}>
        <UnitRatingForm unitId={id} ratingUserId={ratingUserId} />
      </div>
    </div>
  );
};

export default SingleUnitPage;
