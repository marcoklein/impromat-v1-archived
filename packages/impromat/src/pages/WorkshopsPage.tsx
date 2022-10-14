import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useInputDialog } from "../hooks/use-input-dialog";
import { useRxdbMutations } from "../store/use-rxdb-mutations";
import { useWorkshops } from "../store/use-workshops";
import { useComponentLogger } from "../use-component-logger";

export const WorkshopsPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopsPage");
  const database = useRxdbMutations();
  const { workshops: availableWorkshops, isFetching } = useWorkshops();
  const history = useHistory();
  const [presentInputDialog] = useInputDialog();

  const createWorkshopClick = useCallback(() => {
    presentInputDialog({
      header: "New Workshop",
      emptyInputMessage: "Please enter a name for your workshop.",
      onAccept: async (text) => {
        if (!database) return;
        const id = await database.addWorkshop(text, "");
        logger("Adding new workshop with id %s", id);
        const navigateTo = `/workshop/${id}`;
        history.replace(navigateTo);
        logger("Navigating to %s", navigateTo);
      },
    });
  }, [logger, presentInputDialog, history, database]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Workshops</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => createWorkshopClick()}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {isFetching ? (
          <IonSpinner></IonSpinner>
        ) : availableWorkshops.length ? (
          <IonList>
            {availableWorkshops.map((workshop) => (
              <IonItem
                key={workshop.id}
                routerLink={`/workshop/${workshop.id}`}
              >
                <IonLabel>{workshop.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
            }}
            className="ion-padding"
          >
            <div style={{ flexGrow: 1 }}>
              <p>Welcome! Start by creating your first workshop.</p>
              <IonButton expand="full" onClick={() => createWorkshopClick()}>
                <IonIcon slot="start" icon={add}></IonIcon>
                Add Workshop
              </IonButton>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};