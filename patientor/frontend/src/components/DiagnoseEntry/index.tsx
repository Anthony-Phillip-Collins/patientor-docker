import { ReactElement, useContext } from "react";
import { AppContext } from "../../App";
import {
  DiagnoseEntry as IDiagnoseEntry,
  DiagnoseEntryBase as IDiagnoseEntryBase,
} from "../../types/Diagnose";
import exhaustiveMatchGuard from "../../utils/exhaustiveMatchGuard";
import styles from "./styles.module.css";
import HealthRatingIcon from "@mui/icons-material/Favorite";
import HospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import HealthCheckIcon from "@mui/icons-material/MonitorHeart";

interface Props {
  entry: IDiagnoseEntry;
}

interface BaseProps {
  baseProps: IDiagnoseEntryBase;
  themeIcon: ReactElement;
  children?: ReactElement;
}

const DiagnoseEntryBase = ({
  baseProps: { id, date, description, specialist, diagnosisCodes },
  children,
  themeIcon,
}: BaseProps) => {
  const appContext = useContext(AppContext);
  const getDescriptionOf = (code: string): string | undefined =>
    appContext?.diagnoses.find((d) => d.code === code)?.name;

  return (
    <div key={id} className={styles?.diagnoseEntry}>
      <div className={styles?.header}>
        {themeIcon}
        <time dateTime={date}>{date}</time>
      </div>
      <em>{description}</em>
      {diagnosisCodes && (
        <ul>
          {diagnosisCodes?.map((code, i) => (
            <li key={i}>
              {code} {getDescriptionOf(code)}
            </li>
          ))}
        </ul>
      )}
      <>{children}</>
      <span>diagnose by {specialist}</span>
    </div>
  );
};

const DiagnoseEntry = ({ entry }: Props) => {
  try {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <DiagnoseEntryBase baseProps={entry} themeIcon={<HealthCheckIcon />}>
            <HealthRatingIcon
              className={styles[`healthRatingIcon${entry.healthCheckRating}`]}
            />
          </DiagnoseEntryBase>
        );
        break;
      case "Hospital":
        return (
          <DiagnoseEntryBase baseProps={entry} themeIcon={<HospitalIcon />}>
            <span>
              discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </span>
          </DiagnoseEntryBase>
        );
        break;
      case "OccupationalHealthcare":
        return (
          <DiagnoseEntryBase baseProps={entry} themeIcon={<WorkIcon />}>
            <div>employer: {entry.employerName}</div>
          </DiagnoseEntryBase>
        );
        break;
      default:
        exhaustiveMatchGuard(entry);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  return null;
};

export default DiagnoseEntry;
