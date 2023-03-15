import { ReactElement, useContext } from "react";
import { AppContext, AppContextValue } from "../../App";
import HealthRatingIcon from "@mui/icons-material/Favorite";
import HospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import HealthCheckIcon from "@mui/icons-material/MonitorHeart";
import {
  DiagnosisEntry as IDiagnosisEntry,
  DiagnosisEntryBase as IDiagnosisEntryBase,
} from "../../types/Diagnosis";

import styles from "./styles.module.css";
import assertNever from "../../types/utils/assertNever";

interface Props {
  entry: IDiagnosisEntry;
}

interface BaseProps {
  baseProps: IDiagnosisEntryBase;
  themeIcon: ReactElement;
  children?: ReactElement;
}

const DiagnosisEntryBase = ({
  baseProps: { id, date, description, specialist, diagnosisCodes },
  children,
  themeIcon,
}: BaseProps) => {
  const appContext: AppContextValue | null = useContext(AppContext);
  const getDescriptionOf = (code: string): string | undefined =>
    appContext?.diagnoses.find((d) => d.code === code)?.name;

  return (
    <div key={id} className={styles?.DiagnosisEntry}>
      <div className={styles?.header}>
        {themeIcon}
        <time dateTime={date}>{date}</time>
      </div>
      <em>{description}</em>
      {diagnosisCodes && diagnosisCodes.length > 0 && (
        <ul>
          {diagnosisCodes?.map((code, i) => (
            <li key={i}>
              {code} {getDescriptionOf(code)}
            </li>
          ))}
        </ul>
      )}
      <>{children}</>
      <span>Diagnosis by {specialist}</span>
    </div>
  );
};

const DiagnosisEntry = ({ entry }: Props) => {
  try {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <DiagnosisEntryBase baseProps={entry} themeIcon={<HealthCheckIcon />}>
            <HealthRatingIcon className={styles[`healthRatingIcon${entry.healthCheckRating}`]} />
          </DiagnosisEntryBase>
        );
        break;
      case "Hospital":
        return (
          <DiagnosisEntryBase baseProps={entry} themeIcon={<HospitalIcon />}>
            <span>
              discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </span>
          </DiagnosisEntryBase>
        );
        break;
      case "OccupationalHealthcare":
        return (
          <DiagnosisEntryBase baseProps={entry} themeIcon={<WorkIcon />}>
            <>
              <div>employer: {entry.employerName}</div>
              {entry.sickLeave && (
                <div>
                  Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                </div>
              )}
            </>
          </DiagnosisEntryBase>
        );
        break;
      default:
        assertNever(entry);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  return null;
};

export default DiagnosisEntry;
