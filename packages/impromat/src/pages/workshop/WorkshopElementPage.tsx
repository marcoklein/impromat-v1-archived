import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, document, pencil } from "ionicons/icons";
import React, { useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useQuery } from "urql";
import { CustomElementInfoItemComponent } from "../../components/CustomElementInfoItemComponent";
import { LicenseItemComponent } from "../../components/LicenseItemComponent";
import { graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { routeWorkshop } from "../../routes/shared-routes";

const WorkshopElementPageQuery = graphql(`
  query WorkshopElementPage($id: ID!) {
    workshopElement(id: $id) {
      note
      basedOn {
        id
        name
        markdown
        sourceUrl
        sourceName
        sourceBaseUrl
        licenseName
        licenseUrl
        owner {
          id
        }

        ...CustomElement_Element
      }
    }
  }
`);

export const WorkshopElementPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopElementPage");
  const { id: workshopId, partId: workshopElementId } = useParams<{
    id: string;
    partId: string;
  }>();
  const [workshopElementQueryResult] = useQuery({
    query: WorkshopElementPageQuery,
    // TODO pass in workshop id
    variables: { id: workshopElementId },
  });
  const workshopElement = workshopElementQueryResult.data?.workshopElement;
  const basedOnElement = workshopElement?.basedOn;
  const [presentInput] = useInputDialog();

  useStateChangeLogger(workshopElement, "workshopElement", logger);
  useStateChangeLogger(basedOnElement, "basedOnElement", logger);

  const saveNotesChanges = useCallback(
    (note: string) => {
      // if (!mutations || !workshopElement) return;
      // const updatedPart = immer(workshopElement, (draft) => {
      //   draft.note = note;
      // });
      // mutations.updateWorkshopElement(workshopId, updatedPart);
    },
    [workshopElement, workshopId],
  );

  const onChangeNoteClick = () => {
    if (!workshopElement) return;
    presentInput({
      header: "Note",
      isMultiline: true,
      onAccept: (text) => {
        saveNotesChanges(text);
      },
      initialText: workshopElement.note ?? "",
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              routerLink={routeWorkshop(workshopId)}
              routerDirection="back"
            >
              <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{basedOnElement?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {workshopElement ? (
          <IonList>
            <IonCard>
              <IonItem lines="none">
                {workshopElement.note ? (
                  <>
                    <IonLabel className="ion-text-wrap">
                      <ReactMarkdown>{workshopElement.note}</ReactMarkdown>
                    </IonLabel>
                    <IonButtons>
                      <IonButton onClick={() => onChangeNoteClick()}>
                        <IonIcon size="small" icon={pencil}></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </>
                ) : (
                  <IonButton
                    fill="clear"
                    onClick={onChangeNoteClick}
                    color="primary"
                  >
                    <IonIcon icon={document} slot="start"></IonIcon>Add Note
                  </IonButton>
                )}
              </IonItem>
            </IonCard>

            <IonItem lines="none">
              <div className="ion-text-wrap">
                <ReactMarkdown>{basedOnElement?.markdown ?? ""}</ReactMarkdown>
              </div>
            </IonItem>

            {basedOnElement &&
              // TODO verify if the user owns this element
              (basedOnElement.owner && !basedOnElement.sourceName ? (
                <CustomElementInfoItemComponent
                  elementFragment={basedOnElement}
                  workshopId={workshopId}
                  showElementLink
                ></CustomElementInfoItemComponent>
              ) : (
                <LicenseItemComponent
                  authorName={basedOnElement.sourceName}
                  authorUrl={basedOnElement.sourceBaseUrl}
                  licenseName={basedOnElement.licenseName}
                  licenseUrl={basedOnElement.licenseUrl}
                  name={basedOnElement.name}
                  sourceUrl={basedOnElement.sourceUrl}
                ></LicenseItemComponent>
              ))}
          </IonList>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
    </IonPage>
  );
};
